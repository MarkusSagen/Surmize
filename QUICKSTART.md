# Quick Installation Steps
These instructions are related to how to get the server up an runnning and the NLP model configured

  Step 4 is optional


1. clone this repo:
```bash
git clone https://github.com/MarkusSagen/Surmize/tree/cdQA
```
2. Make sure [Java OpenJDK](https://openjdk.java.net/install/) is installed.
3. Run the setup script:
```bash
source start.sh
```
4. Start up the FastAPI APP
```bash
uvicorn api:app --reload --port 5000
```

5. Go to the folder client/ and run in another terminal:
```bash
npm install && npm start
```

6. Go to http://localhost:3000 for the clien side of the application

