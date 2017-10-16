#!/home/appuser/env/bin/python3
import sys
sys.path.append('/app/stance-demo/src')
import json
from train import predict
from vectorize_test import get_vectorizer
#from stance_demo import vectorize, classify


def classify(data):

    #texts = [d['text'] for d in data]
    #vectorizer = get_vectorizer()
    #vectors = [vectorizer.vectorize(d['text']) for d in data]
    #predictions = predict(vectors)

    ##target, stance, confidence = classify(vector)

    #print(predictions)

    return data


if __name__ == '__main__':
    data = json.loads(sys.argv[1])
    classified = classify(data)
    print(json.dumps(classified))
