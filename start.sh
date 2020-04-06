#!/bin/bash

###############################################
#                                             #
# Start up script for installing packages,    #
#     Weights and datasets, in order to       #
#     Run the module                          #
#                                             #
###############################################

# Update Anaconda
#conda update -n base -c defaults conda
#conda create --name venv python=3.7
#conda activate venv

# Create and activate virtual enviroment
# sudo pip install -e .
sudo pip install -r requirements.txt --user

# Install the weights
# Download the datasets, BNP news data
python download_utils.py
echo "Downloaded weights and data files..."


echo "Done"


