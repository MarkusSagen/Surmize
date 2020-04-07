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
sudo chmod +x start.sh
source ./start.sh
```
4. Start up the FastAPI APP
```bash
uvicorn api:app --reload --port 5000
```

5. Go to localhost:5000/docs for interaction with the API

6. Open another terminal. Make a request to the API, but using for instance [HTTPPie](https://httpie.org/):
```bash
http localhost:5000/api query=='your question here'
```

