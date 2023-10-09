import os, json
import time
import essentia.standard as esstd
import numpy as np
import essentia
from paths.pathsToFolders import dir_path, json_dir, model_path
from utils.tempo_ranges import tempo_ranges
from utils.sector_labels import sector_labels
from utils.sector_colors import sector_colors
from flask import Flask

app = Flask(__name__)

all_results = []
pool = essentia.Pool()


classes_embedding_model = esstd.TensorflowPredictEffnetDiscogs(graphFilename=os.path.join(model_path, "discogs-effnet-bs64-1.pb"), output="PartitionedCall:1")
mood_embedding_model = esstd.TensorflowPredictEffnetDiscogs(graphFilename=os.path.join(model_path, "discogs_artist_embeddings-effnet-bs64-1.pb"), output="PartitionedCall:1")

# timbre model and labels
timbre_model = esstd.TensorflowPredict2D(graphFilename=os.path.join(model_path, 'timbre-effnet-discogs-1.pb'), output="model/Softmax")
with open(os.path.join(model_path, 'timbre-effnet-discogs-1.json'), 'r') as json_file:
    metadata = json.load(json_file)
timbre_labels = metadata['classes']

# mood model and labels
mood_model = esstd.TensorflowPredict2D(graphFilename=os.path.join(model_path, 'mtg_jamendo_moodtheme-discogs_artist_embeddings-effnet-1.pb'))

with open(os.path.join(model_path, 'discogs_label_embeddings-effnet-bs64-1.json'), 'r') as json_file:
                metadata = json.load(json_file)
mood_labels = metadata['classes']

# instrument
instrument_model = esstd.TensorflowPredict2D(graphFilename=os.path.join(model_path, 'mtg_jamendo_instrument-discogs-effnet-1.pb'))

with open(os.path.join(model_path, 'mtg_jamendo_instrument-effnet-discogs_artist_embeddings-1.json'), 'r') as json_file:
                metadata = json.load(json_file)
instrument_labels = metadata['classes']

# valence / arousal
va_embedding_model = esstd.TensorflowPredictMusiCNN(graphFilename=os.path.join(model_path, "msd-musicnn-1.pb"), output="model/dense/BiasAdd")

va_model = esstd.TensorflowPredict2D(graphFilename=os.path.join(model_path, "emomusic-msd-musicnn-2.pb"), output="model/Identity")

# engagement and approachability
approachability_model = esstd.TensorflowPredict2D(graphFilename=os.path.join(model_path, "approachability_3c-discogs-effnet-1.pb"), output="model/Softmax")

with open(os.path.join(model_path, 'approachability.json'), 'r') as json_file:
    metadata = json.load(json_file)
approachability_labels = metadata['classes']

engagement_model = esstd.TensorflowPredict2D(graphFilename=os.path.join(model_path, "engagement_3c-discogs-effnet-1.pb"), output="model/Softmax")

with open(os.path.join(model_path, 'engagement.json'), 'r') as json_file:
    metadata = json.load(json_file)
engagement_labels = metadata['classes']

print("MODEL LOADED")



def load_audio(file_path):
    """Load and resample audio from the given file path."""
    # audio_og = esstd.MonoLoader(filename=file_path, sampleRate=44100)()
    audio = esstd.MonoLoader(filename=file_path, sampleRate=16000, resampleQuality=4)()
    return audio


def predict_label_from_classes(predictions, class_labels):
    """
    Predict the primary label(s) present in the audio file.
    Returns the predicted label(s).
    """
    # Extract the tags from the predictions
    tags = predictions[0][:len(class_labels)]

    # Determine the most likely label(s) based on the tag probabilities
    max_index = int(np.argmax(tags))
    predicted_label = class_labels[max_index]

    return predicted_label

# Function to assign a tempo label based on the BPM range
def assign_tempo_label(bpm):
    for label, (min_bpm, max_bpm) in tempo_ranges.items():
        if min_bpm <= bpm < max_bpm:
            return label
    return 'unknown'

# from valence/arousal to color and relative emotion
def get_sector_color_label(valence, arousal, threshold):
    # Calculate the polar coordinates of the point
    theta = np.arctan2(valence, arousal)

    # Shift the angle to fall within the range [0, 2*pi)
    if theta < 0:
        theta += 2 * np.pi

    # If the distance is below the threshold, return 'neutral' color and label
    if abs(valence) < threshold and abs(arousal) < threshold:
        return 'white', 'neutral'

    # Define the number of sectors
    num_sectors = 16

    # Define the sector angles
    sector_angles = 2 * np.pi / num_sectors

    # Find the sector that the point falls into
    sector_index = int(np.floor(theta / sector_angles))

    # Get the color and label of the sector
    sector_color = sector_colors[sector_index]
    sector_label = sector_labels[sector_index]

    return sector_color, sector_label

# constants
THRESHOLD = 0.2



@app.route("/process_audio")
def process_audio():
    print("START")

    # Initialize a list or set to store the names of analyzed files
    analyzed_files = set()

    # Check if the JSON file with analyzed file names exists
    analyzed_files_json_path = os.path.join(json_dir, 'analyzed_files.json')
    if os.path.exists(analyzed_files_json_path):
        with open(analyzed_files_json_path, 'r') as analyzed_file:
            analyzed_files = set(json.load(analyzed_file))

    for root, dirs, files in os.walk(dir_path):
        for file_name in files:
            if file_name.lower().endswith('.mp3') or file_name.lower().endswith('.wav'):
                file_path = os.path.join(root, file_name)

                # Check if the file has already been analyzed
                if file_name in analyzed_files:
                    print("Skipping file (already analyzed):", file_path)
                    continue

                start_time = time.time()

                print("Loading file:", file_path)

                audio = load_audio(file_path)

                # compute beat positions and BPM.
                rhythm_extractor = esstd.RhythmExtractor2013(method="degara")
                bpm, beats, beats_confidence, _, beats_intervals = rhythm_extractor(audio)
                pool.add('bpm', bpm)

                # tempo label
                tempo_label = assign_tempo_label(bpm)

                # key
                key_extractor = esstd.KeyExtractor(profileType = 'krumhansl')
                key, scale, key_strength_raw = key_extractor(audio)
                key_strength = round(key_strength_raw   , 3)

                # danceability
                danceability_raw, _ = esstd.Danceability()(audio)
                danceability = round(danceability_raw * 100 / 3, 3)

                # dynamic complexity & global loudness
                dynamic_complexity, global_loudness_raw = esstd.DynamicComplexity()(audio)
                normalized_dynamic_complexity = round(dynamic_complexity / abs(global_loudness_raw), 3)
                global_loudness = round(global_loudness_raw, 3)

                # embeddings
                classes_embeddings = classes_embedding_model(audio)
                mood_embeddings = mood_embedding_model(audio)

                # timbre
                timbre_predictions = timbre_model(classes_embeddings)
                timbre_predicted_label = predict_label_from_classes(timbre_predictions, timbre_labels)

                # mood
                mood_predictions = mood_model(mood_embeddings)
                mood_predicted_label = predict_label_from_classes(mood_predictions, mood_labels)

                # instrument - to review
                instrument_predictions = instrument_model(classes_embeddings)
                instrument_predicted_label = predict_label_from_classes(instrument_predictions, instrument_labels)

                # valence & arousal
                va_embeddings = va_embedding_model(audio)
                va_predictions = va_model(va_embeddings)
                va_predictions = np.mean(va_predictions.squeeze(), axis=0)
                va_predictions = (va_predictions - 5) / 4
                valence = va_predictions[0]
                valence = float(valence)
                arousal = va_predictions[1]
                arousal = float(arousal)

                # color and relative emotion label
                color, emotion = get_sector_color_label(valence, arousal, threshold=THRESHOLD)

                for frame in esstd.FrameGenerator(audio, frameSize=2048, hopSize=1024):
                    # Perform frame-specific processing
                    frame_spectrum = esstd.Spectrum()(frame)

                    f, m = esstd.SpectralPeaks(magnitudeThreshold=0.01, minFrequency=10)(frame_spectrum)

                    # Calculate inharmonicity (sample rate inferred from audio)
                    inharmonicity = esstd.Inharmonicity()(f, m)

                harmonicity_pct = (1 - inharmonicity) * 100

                # approachability & engagement
                approach_predictions = approachability_model(classes_embeddings)
                engagement_predictions = engagement_model(classes_embeddings)
                approachability = predict_label_from_classes(approach_predictions, approachability_labels)
                engagement = predict_label_from_classes(engagement_predictions, engagement_labels)

                # time for each file
                end_time = time.time()
                elapsed_time = end_time - start_time
                print(f"File processing time: {elapsed_time} seconds")

                # Save the analyzed file name to the list or set
                analyzed_files.add(file_name)

                # Save the updated list or set to the JSON file
                with open(analyzed_files_json_path, 'w') as analyzed_file:
                    json.dump(list(analyzed_files), analyzed_file)

                # esstd.YamlOutput(filename='file_info', format='json')(pool)

                # Process the audio file and append the results to the list
                # results = process_audio_file(file_path, file_name)
                results = {
                    "file_name": file_name,
                    "BPM": bpm,
                    "key": key,
                    "scale": scale,
                    "key_strength": key_strength,
                    "mood": mood_predicted_label,
                    "tempo": tempo_label,
                    "danceability": danceability,
                    "dynamic_complexity_norm": normalized_dynamic_complexity,
                    "global_loudness_dB": global_loudness,
                    "valence": valence,
                    "arousal": arousal,
                    "color": color,
                    "emotion": emotion,
                    "timbre": timbre_predicted_label,
                    "instrument": instrument_predicted_label,
                    "approachability": approachability,
                    "engagement": engagement,
                    # "pitch": pitch,
                    # "pitch confidence": pitch_confidence_pct,
                    "harmonicity %": harmonicity_pct
                }
                all_results.append(results)
    print("END")

    # At the end of your process_audio function, save all_results as a JSON file
    with open(os.path.join(json_dir, 'backend_analysis.json'), 'w') as json_file:
        json.dump(all_results, json_file)

    return {"my results": all_results}


if __name__ == "__main__":
    # main()
    app.run(debug=True)

    """    all_results = []

    # Check if the explanation JSON file already exists
    explanation_json_path = os.path.join(dir_path, 'explanation.json')
    if not os.path.exists(explanation_json_path):
        # If the JSON file doesn't exist, create it
        create_explanation_json()
    print("json done")

    for root, dirs, files in os.walk(dir_path):
        for file_name in files:
            if file_name.lower().endswith('.mp3') or file_name.lower().endswith('.wav'):
                file_path = os.path.join(root, file_name)
                print("Loading file:", file_path)

                # Process the audio file and append the results to the list
                # results = process_audio_file(file_path, file_name)
                # all_results.append(results)

    return all_results"""
    

