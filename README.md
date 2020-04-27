# Surmize
Summarization and NLP application  
  
  
### Links:

- [Introduction Slides](https://www.notion.so/PowerPoint-f21825f57a6446c28963273e816bd053)  
- [Diagram from Slides](https://drive.google.com/file/d/1g5H9L4zniVGwwVitnv7yTpbNLiyudYaF/view?usp=sharing)  
- [Project Information Folder](https://www.notion.so/Summarize-App-c834b35bb7d748c4a57662652b9ce326)
- [Report](https://www.overleaf.com/8461541271rbqgrmytchtk)
- [A previous Rapport](https://www.overleaf.com/project/5e6525aeff03ca00018f9903)  
    
## Table of Content
  

  
  
### Usage 
These instructions are related to how to get the server up an runnning and the NLP model configured  

Some have experienced problems when using python3 directly, we therefore recommend users to install and use python3 via Anaconda

1. clone this repo:
```bash
git clone https://github.com/MarkusSagen/Surmize.git
```
2. Make sure [Java OpenJDK](https://openjdk.java.net/install/) is installed.
3. Run the setup script:
```bash
source start.sh
```
4. Start up the FastAPI APP by running in a terminal
```bash
uvicorn api:app --reload --port 5000
```
1. Open another terminal and navigate to the folder Surmize/client/ and run:
```bash
npm install && npm start
```
6. Go to the address [http://localhost:3000](http://localhost:3000) in a browser



#### Contributers  
[Markus Sagen](https://github.com/MarkusSagen)  
[Alexander Bergkvist](https://github.com/AlexanderBergkvist)  
[Nils Hedberg](https://github.com/nilshugo)  
[Sebastian Rollino](https://github.com/sebbersk)  
