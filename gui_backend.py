from flask import Flask, url_for, redirect, request
from subprocess import check_output, Popen, PIPE

app = Flask(__name__)

@app.route('/')
def home():
    return redirect(url_for('static', filename='index.html'))

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)

@app.route('/record_template', methods = ['POST'])
def record_template():
    Popen(["./record_template.py", request.json['name']], stdout=PIPE).wait()
    return {}

@app.route('/record_behavior', methods = ['POST'])
def record_behavior():
    print('received')
    terminal_command = ["gnome-terminal"]
    Popen(terminal_command)
    return {}