#!/bin/bash

###############################################
#                                             #
# Start up script for installing packages,    #
#     Weights and datasets, in order to       #
#     Run the module                          #
#                                             #
###############################################
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
# Create and activate virtual enviroment
# sudo pip install -e .
sudo pip install -r requirements.txt --user && echo "${green}Installed dependencies${reset}" || echo "${red}Failed to install dependencies${reset}" 

# Install the weights
# Download the datasets, BNP news data
mkdir data/uploaded data/pendind data/examples && echo "${green}Successfully created data folders${reset}" 
python3 download_utils.py && echo "${green}Downloaded weights and data${reset}" || echo "${red}Failed to download required weights and data${reset}" 
echo "Done!"


