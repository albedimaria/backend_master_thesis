# EssentialSounds: Innovative 3D Music Sample Filtering
## Reimagine Music Interaction and Visualization in Real-time with React

EssentialSounds is a project that aims to change the way we visualize music samples. This repository houses the groundbreaking codebase that combines 
the power of Python's backend with React's frontend to bring you unparalleled 3D music sample visualization and an innovative filtering system.
The main features of this project are the following:

* complete feature extraction using Essentia library
* new way of real-time filtering based on extracted features
* new 3D way of visualizing music samples: each axis displays a feature chosen by the user
* large set of available features for a unique and customised experience 
* possibility to handle up to 50 samples simultaneously without losing performance

## how the project appears

### overall view (hidden filters section)
<img width="1040" alt="whole" src="https://github.com/albedimaria/frontend-thesis/assets/74492752/f0f5a97e-3caa-4662-a852-7d0c7a74fee2">

### filters section
<img width="192" alt="filters" src="https://github.com/albedimaria/frontend-thesis/assets/74492752/0af92c35-826d-4123-89f6-0150679722b0">

### more in detail
<img width="184" alt="filters in detail" src="https://github.com/albedimaria/frontend-thesis/assets/74492752/a3db896b-9201-4fc2-a72a-04f85664cbf1">


## working in progress 
* connection back / front ends through socket.io-client
* isPlaying / isSelected sphere and what it should do
* json used to link front / back ends (fast and not volatile)
* loader to handle the processing of samples at the beginning

## artistic direction choices to make:
* spheres representing brief samples or long / processed loops
* play the sample when the sphere is clicked / send the sample to Ableton


## further improvements 
* addictional server front-end / external daw
* loader at the beginning
* connection with another device (another server needed)
* drag and drop to add more samples while running the system
* instructions for the user through a pop-up

  
## known issues (to be solved)
* the first instance of the sphere is repeated four times due to the implementation. Should be just one (black box UX)
* The features on this axis cannot be freely chosen; it was necessary to split them manually (black box UX)
* The colors are not under control; they appear or do not appear randomly. The colors should always be visible (white box UX)
