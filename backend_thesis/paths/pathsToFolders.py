import json
import os

paths_dir = "/home/albertodimaria/thesis/backend_thesis/paths"

# Load configuration from config.json inside the "paths" folder
config_file_path = os.path.join(paths_dir, "config.json")

try:
    # Load configuration from config.json
    with open(config_file_path, "r") as config_file:
        config = json.load(config_file)

    # Access configuration values
    dir_path = config["dir_path"]
    model_path = config["model_path"]
    json_dir = config["json_dir"]

    # Your code that uses these variables goes here

except FileNotFoundError:
    print(f"Error: Configuration file '{config_file_path}' not found.")
except json.JSONDecodeError as e:
    print(f"Error: JSON decoding error in '{config_file_path}': {e}")
except KeyError as e:
    print(f"Error: Missing key '{e}' in the configuration file.")

