# Quick Installation Steps
These instructions are related to how to get the server up an runnning and the NLP model configured

  Step 4 is optional


1. clone this repo:
```bash
git clone XXXXXX
```
2. Make sure [Java OpenJDK](https://openjdk.java.net/install/) is installed.
3. Run the setup script:
```bash
sudo chmod +x start.sh
source ./start.sh
```
4.Verify that the dataset_patha and path for the trained model are configures correctly before deploying model to a REST API:
```bash
echo "$dataset_path"
echo "$reader_path"
echo "$FLASK_ENV"
echo "$FLASK_APP"
```
or run
```bash
export dataset_path=path-to-dataset.csv
export reader_path=path-to-reader-model

export FLASK_ENV=development
export FLASK_APP=api.py
```
6. Start up the Flask APP
```bash
flask run
```

5. Open another terminal. Make a request to the API, but using for instance [HTTPPie](https://httpie.org/):
```bash
http localhost:5000/api query=='your question here'
```


