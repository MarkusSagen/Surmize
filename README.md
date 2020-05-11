# Surmize
Summarization and NLP application  
  
  
### Links:
- [Slide Presentation](#TODO)
- [Introduction Slides: Before the Project Started](https://www.notion.so/PowerPoint-f21825f57a6446c28963273e816bd053)  
- [Project Information Folder](https://www.notion.so/Summarize-App-c834b35bb7d748c4a57662652b9ce326)
- [Report](#TODO)
- [Datasets](#TODO)
- [Future Improvments](#TODO)
  
  
### Usage 
These instructions are related to how to get the server up an runnning, the UI and NLP models for summarization and Close-Domain QA.    
   
Some have experienced problems when using Python3 directly, we therefore recommend users to install and use Python3 via Anaconda

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
7. Upload files or texts you want to ask questions about



#### Contributers  
[Markus Sagen](https://github.com/MarkusSagen)  
[Alexander Bergkvist](https://github.com/AlexanderBergkvist)  
[Nils Hedberg](https://github.com/nilshugo)  
[Sebastian Rollino](https://github.com/sebbersk)  
