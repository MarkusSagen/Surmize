# Surmize
A full scale client-server model for Summarizing and asking close-domain Questions on documents and or texts directly in your browser. The file extentions **.txt**, **.story** and **.pdf** are currently supported and some **.CSV**-files.    
   
This project was developed by us for the course Independent Project in Information Engineering at Uppsala University. The applicaiton is built mostly in React, FastAPI and Python modeles. The underlying NLP models are based on Huggingface. Both models are state-of-the-art transformer models, which have performed very well on a diverse number of NLP tasks.

### Landing Page 
<img src="https://github.com/MarkusSagen/img/blob/master/surmize/home.png" width="80%" />  

### Work Area 
<img src="https://github.com/MarkusSagen/img/blob/master/surmize/workspace.png" width="80%" />  
  
### Usage 
These instructions are related to how to get the server up an runnning, the UI and NLP models for summarization and Close-Domain QA.    
   
Some have experienced problems when using Python3 directly, we therefore recommend users to install and use Python3 via [Anaconda](https://www.anaconda.com/products/individual)

1. Clone this repo:
```bash
git clone https://github.com/MarkusSagen/Surmize.git
```
2. Make sure [Java OpenJDK](https://openjdk.java.net/install/) is installed.
3. Run the setup script:
```bash
source start.sh
```
4. Start up the server in development mode by running:
```bash
uvicorn api:app --reload --port 5000
```
5. Open another terminal and navigate to the folder **Surmize/client/** and run:
```bash
npm install && npm start
```
6. Go to the address [http://localhost:3000](http://localhost:3000) in a browser


7. Upload files or texts you want to ask questions about, example texts can be found [here](https://drive.google.com/open?id=1CF-4AzG5CPdos4coXfRRx7iz-GR-duoK)



#### Contributers  
[Markus Sagen](https://github.com/MarkusSagen)  
[Alexander Bergkvist](https://github.com/AlexanderBergkvist)  
[Nils Hedberg](https://github.com/nilshugo)  
[Sebastian Rollino](https://github.com/sebbersk)  
