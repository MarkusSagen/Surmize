# Quick Installation Steps
These instructions are related to how to get the server up an runnning and the NLP model configured


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

