from flask import Flask,jsonify,request
from happytransformer import HappyTextToText, TTSettings

happy_tt = HappyTextToText("T5", "vennify/t5-base-grammar-correction")

args = TTSettings(num_beams=5, min_length=1)

# Add the prefix "grammar: " before each input 
result = happy_tt.generate_text("grammar: This sentences has has bads grammar.", args=args)
app =   Flask(__name__)
  
@app.route('/members', methods = ['GET'])
def ReturnJSON():
    if(request.method == 'GET'):
        data = jsonify(result)
        data.headers.add("Access-Control-Allow-Origin", "*")
        return data
  
if __name__=='__main__':
    app.run(debug=True)