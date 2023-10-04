import math
import os, json
# from utils_features.featureProcessing import process_audio_file
# from featureJson import create_results_json
import essentia.standard as esstd
import numpy as np
import essentia
from paths.pathsToFolders import dir_path, json_dir, model_path
from utils.tempo_ranges import tempo_ranges

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



print("MODEL LOADED")



def load_audio(file_path):
    """Load and resample audio from the given file path."""
    # audio_og = esstd.MonoLoader(filename=file_path, sampleRate=44100)()
    audio = esstd.MonoLoader(filename=file_path, sampleRate=16000, resampleQuality=4)()
    return audio


def predict_label(predictions, class_labels):
    """
    Predict the primary label(s) present in the audio file.
    Returns the predicted label(s).
    """
    # Extract embeddings using the embedding model
    """embeddings = embedding_model(audio)

    # Predict labels using the classification model
    predictions = classification_model(embeddings)"""

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

@app.route("/process_audio")
def process_audio():
    print("START")

    for root, dirs, files in os.walk(dir_path):
        for file_name in files:
            if file_name.lower().endswith('.mp3') or file_name.lower().endswith('.wav'):
                file_path = os.path.join(root, file_name)
                print("Loading file:", file_path)

                audio = load_audio(file_path)

                # compute beat positions and BPM.
                rhythm_extractor = esstd.RhythmExtractor2013(method="degara")
                bpm, beats, beats_confidence, _, beats_intervals = rhythm_extractor(audio)
                pool.add('bpm', bpm)

                # tempo label
                tempo_label = assign_tempo_label(bpm)

                # key
                key_extractor = esstd.KeyExtractor(profileType = 'Krumhansl')
                key, scale, key_strength = key_extractor(audio)

                # embeddings
                classes_embeddings = classes_embedding_model(audio)
                mood_embeddings = mood_embedding_model(audio)

                # timbre
                timbre_predictions = timbre_model(classes_embeddings)
                timbre_predicted_label = predict_label(timbre_predictions, timbre_labels)

                # mood
                mood_predictions = mood_model(mood_embeddings)
                mood_predicted_label = predict_label(mood_predictions, mood_labels)

                # instrument - to review
                instrument_predictions = instrument_model(classes_embeddings)
                instrument_predicted_label = predict_label(instrument_predictions, instrument_labels)

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
                    # "danceability": 75,
                    # "dynamic_complexity_norm": round(normalized_dynamic_complexity, 3),
                    # "global_loudness_dB": round(global_loudness, 1),
                    # "valence": valence,
                    # "arousal": arousal,
                    # "color": color,
                    # "emotion": emotion,
                    "timbre": timbre_predicted_label,
                    "instrument": instrument_predicted_label,
                    # "pitch": pitch,
                    # "pitch confidence": pitch_confidence_pct,
                    # "harmonicity %": harmonicity_pct
                }
                all_results.append(results)
    print("END")
    return {"results": all_results}


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
    

