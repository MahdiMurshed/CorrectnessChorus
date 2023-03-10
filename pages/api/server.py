import json
from flask import Flask,jsonify,request
import os
from dotenv import load_dotenv
load_dotenv()  # this will load variables from .env.Hello
# from transformers import pipeline
from happytransformer import HappyTextToText, TTSettings
from flask_cors import CORS, cross_origin
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize
app =   Flask(__name__)
CORS(app)
# corrector = pipeline('text2text-generation','pszemraj/flan-t5-large-grammar-synthesis',)
happy_tt = HappyTextToText("T5",os.environ.get("CORR_CHOR"))
args = TTSettings(num_beams=5, min_length=1)
@app.route('/members', methods = ['POST'])
@cross_origin()
def ReturnJSON():
    raw_text = request.args.get('text')
    text_arr = sent_tokenize(raw_text)
    result = []
    for i in text_arr:
        print(i)
        result.append(happy_tt.generate_text("grammar: "+i, args=args))
    print(raw_text)
    print(result)
    # corrector(raw_text)
    data = jsonify(result)
    
    return data

from werkzeug.exceptions import HTTPException

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

    
if __name__=='__main__':
    app.run(debug=True)