#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images
mkdir -p public/videos
mkdir -p public/sounds
mkdir -p src/assets/images
mkdir -p src/assets/videos
mkdir -p src/assets/sounds

# Copy sounds from Downloads directory
echo "Copying sound files from Downloads..."
if [ -f ~/Downloads/clock-tick-101150.mp3 ]; then
  cp ~/Downloads/clock-tick-101150.mp3 src/assets/sounds/
else
  echo "Warning: clock-tick-101150.mp3 not found in Downloads"
fi

if [ -f ~/Downloads/button-press.mp3 ]; then
  cp ~/Downloads/button-press.mp3 src/assets/sounds/
else
  echo "Warning: button-press.mp3 not found in Downloads"
fi

if [ -f ~/Downloads/crowd-cheer.mp3 ]; then
  cp ~/Downloads/crowd-cheer.mp3 src/assets/sounds/
else
  echo "Warning: crowd-cheer.mp3 not found in Downloads"
fi

if [ -f ~/Downloads/crowd-aww.mp3 ]; then
  cp ~/Downloads/crowd-aww.mp3 src/assets/sounds/
else
  echo "Warning: crowd-aww.mp3 not found in Downloads"
fi

# Copy image file
echo "Copying image files from Downloads..."
if [ -f ~/Downloads/capitol.jpg ]; then
  cp ~/Downloads/capitol.jpg src/assets/images/
else
  echo "Warning: capitol.jpg not found in Downloads"
fi

# Copy video files
echo "Copying video files from Downloads..."
if [ -f ~/Downloads/sketchy-mike.mov ]; then
  cp ~/Downloads/sketchy-mike.mov src/assets/videos/
else
  echo "Warning: sketchy-mike.mov not found in Downloads"
fi

if [ -f ~/Downloads/challenge.mov ]; then
  cp ~/Downloads/challenge.mov src/assets/videos/
else
  echo "Warning: challenge.mov not found in Downloads"
fi

echo "Media copy complete! All files are sourced locally, no internet downloads." 