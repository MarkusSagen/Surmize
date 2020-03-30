#!/bin/bash

###############################################
#                                             #
# Start up script for installing packages,    #
#     Weights and datasets, in order to       #
#     Run the module                          #
#                                             #
###############################################


# Install pip and virtual env
python3 -m pip install --user --upgrade pip
python3 -m pip install --user virtualenv


# Create and activate virtual enviroment
# sudo pip install -e .
sudo pip install -r requirements.txt
# pip install --user wget
# pip install --user pandas


# Install the weights
# Download the datasets, BNP news data
python3 download_utils.py


# Test to see that local models are working
# python3 test_model.py


# Setup flask
# Define path to the dataset
echo ""
echo "Exporting datapath, model and Flask configs"
export dataset_path='./data/bnpp_newsroom_v1.1/bnpp_newsroom-v1.1.csv'
# Define path to the trained model
export reader_path='./models/bert_qa.joblib'

# Sets flask in development mode
# Remove this when deploying
export FLASK_ENV=development
export FLASK_APP=api.py

echo "Done"


