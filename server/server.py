import os
from flask import Flask
from flask_cors import CORS, cross_origin
import os
app = Flask(__name__)
@app.route("/<string:path>")
@cross_origin()
def Home(path):
    try:
        file = open(os.path.join(os.path.abspath(os.curdir),"files\\"+path))
        data = file.read()
        file.close()
        return data
    except:
        return ""
    
app.run(debug=True)