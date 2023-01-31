import json
from flask import Flask,jsonify,request
from happytransformer import HappyTextToText, TTSettings
from flask_cors import CORS, cross_origin
app =   Flask(__name__)
CORS(app)
happy_tt = HappyTextToText("T5", "vennify/t5-base-grammar-correction")
args = TTSettings(num_beams=5, min_length=1)
@app.route('/members', methods = ['POST'])
@cross_origin()
def ReturnJSON():
    test = request.args.get('test')
    print(test)
    result = happy_tt.generate_text("grammar: "+test, args=args)
    data = jsonify(result)
    data.headers.add("Access-Control-Allow-Origin", "*")
    
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