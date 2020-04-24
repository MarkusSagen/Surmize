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
sudo pip3 install -r requirements.txt --user && echo "${green}Installed dependencies${reset}" || echo "${red}Failed to install dependencies${reset}"
python3 -m spacy download en_core_web_sm --user && echo "${green}Downloaded SpaCy english word tokens${reset}" || echo "${red}Failed to download SpaCy english word tokens${reset}"

#Install textrank (extractive textsummarizer) Wordembeddings

cd summarization/textrank
wget http://nlp.stanford.edu/data/glove.6B.zip && echo "${green}Downloaded textrank word embeddings${reset}" || echo "${red}Failed to downloaded textrank word embeddings${reset}"
unzip glove*.zip
rm glove.6B.zip
rm rm glove.6B.200d.txt glove.6B.300d.txt glove.6B.50d.txt
cd ../..

# Install the weights
# Download the datasets, BNP news data
mkdir data
cd data
mkdir uploaded examples && echo "${green}Successfully created data folders${reset}"
cd ..
python3 download_utils.py && echo "${green}Downloaded weights and data${reset}" || echo "${red}Failed to download required weights and data${reset}"
echo "Done!"
