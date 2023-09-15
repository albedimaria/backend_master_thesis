# EssentialSounds: Innovative 3D Music Sample Filtering
## Reimagine Music Interaction and Visualization in Real-time with React

## Index
1. [Introduction](#introduction)
2. [Project Features](#project-features)
3. [Project Appearance](#project-appearance)
   - [Overall View (Hidden Filters Section)](#overall-view-hidden-filters-section)
   - [Filters Section](#filters-section)
   - [More in Detail](#more-in-detail)
4. [Filter Section](#filter-section)
5. [Work in Progress](#work-in-progress)
6. [Artistic Direction Choices](#artistic-direction-choices)
7. [Further Improvements](#further-improvements)
8. [Known Issues](#known-issues)

## Introduction
EssentialSounds is a project that aims to change the way we visualize music samples. This repository houses the groundbreaking codebase that combines 
the power of Python's backend with React-3-Fiber's frontend to bring you unparalleled 3D music sample visualization and an innovative filtering system.
The main features of this project are the following:

## Project Features
- Complete feature extraction using Essentia library.
- New 3D way of visualizing music samples with R3F.
- New way to organize the dataset: each axis displays a feature chosen by the user.
- New way of real-time filtering based on extracted features.
- Large set of available features for a unique and customized experience.
- Possibility to handle up to 300 samples simultaneously without losing performance.
- Responsive (to be tested for optimized UX).
- Easy, intuitive, and guided UX.

## Project Appearance

### Overall View (Hidden Filters Section)
![Overall View](https://github.com/albedimaria/frontend-thesis/assets/74492752/f0f5a97e-3caa-4662-a852-7d0c7a74fee2)

### Filters Section
![Filters Section](https://github.com/albedimaria/frontend-thesis/assets/74492752/0af92c35-826d-4123-89f6-0150679722b0)

### More in Detail
![Filters in Detail](https://github.com/albedimaria/frontend-thesis/assets/74492752/a3db896b-9201-4fc2-a72a-04f85664cbf1)

## Filter Section
- Features Involved
  - BPM
  - Danceability
  - Mood
  - Texture (work in progress)
  - Instrument
  - Key
- The choice to not provide the genre as an available feature aims to focus on the other meta descriptors.
- The set of features will be enlarged.
- BPM, danceability, and layers of texture can be selected through a double slider, which sets the range.
- Instrument, key, and mood can be selected using an intuitive dropbox.
- Possibility to filter by the name of the samples.
- The user can choose the name of the samples between the real sample name or a feature name (such as "sad - piano - 90BPM").
- Filtering will be done in real-time; it will re-render the spheres due to the code logic, but it will be a black-box approach for the user.

## Work in Progress
- Connection back / front ends through socket.io-client.
- IsPlaying / isSelected sphere and what it should do.
- JSON used to link front / back ends (fast and not volatile).
- Loader to handle the processing of samples at the beginning.

## Artistic Direction Choices
- Spheres representing brief samples or long / processed loops.
- Play the sample when the sphere is clicked / send the sample to Ableton.

## Further Improvements
- Additional server front-end / external DAW.
- Loader at the beginning.
- Connection with another device (another server needed).
- Drag and drop to add more samples while running the system.
- Instructions for the user through a pop-up.

## Known Issues
- The first instance of the sphere is repeated four times due to the implementation. Should be just one (black box UX).
- The features on this axis cannot be freely chosen; it was necessary to split them manually (black box UX).
- The colors are not under control; they appear or do not appear randomly. The colors should always be visible (white box UX).
Feel free
