import random
from flask import Flask

import os, re, json, codecs, io, cv2
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
from scipy.ndimage import zoom
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
from tensorflow.keras.models import load_model

from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import warnings
import base64
import time
from webdriver_manager.chrome import ChromeDriverManager
import urllib.request

latestchromedriver = ChromeDriverManager().install()

warnings.filterwarnings('ignore')

load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("API_KEY")

MODEL_PATH = 'my_model.h5'

model = load_model(MODEL_PATH)

obj_json = codecs.open('labels.json', 'r', encoding='utf-8').read()
labels = json.loads(obj_json)

HEADERS = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
                           'Accept-Language': 'en-US, en;q=0.5'})

driver = webdriver.Chrome(executable_path=latestchromedriver)

def model_predict(img_path, model):
    img = cv2.imread(img_path)
    resized_image = cv2.resize(img, (224, 224))
    
    preds = model.predict(resized_image)
    return preds

def webScraping(message):
    htmlContent = []
    for fertilizer in message:
        urlExtension = '+'.join(fertilizer.split())
        url = "https://www.amazon.in/s?k="+urlExtension+"+fertilizer"
        driver.get(url)
        html = driver.page_source
        print(url)

        soup = BeautifulSoup(html, 'html.parser')
        div = soup.find('div', attrs={'class': 'rush-component s-expand-height'})

        content = {}
        content['fertilizer'] = fertilizer
        content['url'] = 'https://www.amazon.in' + div.find('a', attrs={'class': 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})['href']
        content['img'] = div.find('img', attrs={'class': 's-image'}).get('src')
        content['productName'] = div.find('span', attrs={'class': 'a-size-base-plus a-color-base a-text-normal'}).text
        content['rating'] = div.find('span', attrs={'class': 'a-size-base'}).text
        content['price'] = div.find('span', attrs={'class': 'a-offscreen'}).text

        if content['rating'] == "More Like This":
            content['rating'] = "Average"

        htmlContent.append(content)   

    driver.quit()
    return htmlContent


def webScrapingScheme():
    data = []
    url = "https://www.investindia.gov.in/schemes-for-pharmaceuticals-manufacturing"
    source = requests.get(url, headers=HEADERS)

    soup = BeautifulSoup(source.content, "lxml")
    div = soup.find('div', attrs={'class': 'region region-page-top'})

    for topDiv in div.findAll('div', attrs={'class': 'section-background'}):
        content = {}
        content['heading'] = topDiv.find('h2', attrs={'class': 'heading'}).text
        highlight = topDiv.find('div', attrs={'class': 'highlights-cards'})
        ul = highlight.find('ul', attrs={'class': 'flex'})

        liEle = []
        for li in ul.findAll('li'):
            details = {}
            details['heading'] = li.find('h3').text
            details['text'] = li.findAll('p')[1].text

            liEle.append(details)
        
        content['details'] = liEle

        print(content)

        data.append(content)

    return data


def extractFertilizerName(content):
    content = content.split('\n')
    message = [];
    for point in content:
        if(len(point)>0 and point[0].isdigit()):
            point = re.sub("\(.*?\)","()", point)
            point = re.sub('[^a-zA-Z\s]+', '', point)
            message.append(" ".join(point.split()))
    return message
            

def generateChatResponse(prompt, res):
    messages = []
    messages.append({"role": "system", "content": "You are kind helpful assistant."})

    if prompt:
        messages.append(
            {"role": "user", "content": prompt},
        )
        print(messages)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )

    try:
        answer = response.choices[0].message.content
        if(res == 1):
            answer = extractFertilizerName(answer)

    except:
        answer = 'Oops you beat the AI, try a different question, if the problem persists, come back later.'

    return answer


@app.route("/result", methods=["POST"])
def index():
    file = request.files['file']

    file_path = "my-app/src/uploads/crop.jpg"
    file.save(file_path)

    if file is None or file.filename == "":
        return {"error": "no file"}
        
    preds = model_predict("my-app/src/uploads/crop.jpg", model)
    pred_class = preds.argmax()              
    data = labels[pred_class]

    content = "Just give me the names of the most 3 commonly used fertilizers for " + data['name'] + " crop disease in India without any acknowlegment"
    data['fertilizer'] = generateChatResponse(content, 1)
    # data['fertilizer'] = ["Urea"]
    data['htmlContent'] = webScraping(data['fertilizer'])

    return jsonify(data)


@app.route("/usermanual", methods=["POST"])
def usermanual():
    data = request.json

    data['contain'] = generateChatResponse("What " + data['name'] + " contains", 0)
    time.sleep(20)
    data['procedure'] = generateChatResponse("Procedure to use " + data['name'], 0)
    time.sleep(20)
    data['precaution'] = generateChatResponse(data['name'] + " usage precautions", 0)
    print(data)

    return data


@app.route("/scheme")
def scheme():
    return webScrapingScheme()


if __name__ == '__main__':
    app.run()