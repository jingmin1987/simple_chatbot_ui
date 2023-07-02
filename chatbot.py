from flask import Flask, render_template, request
from random import randint
import time

app = Flask(__name__, static_folder='static')


@app.route("/")
def main():
    return render_template('chatbot_ui.html')


@app.route("/get")
def get_llm_response():
    user_input = request.args.get('user_input')
    response = run_llm(user_input)
    time.sleep(randint(0, 1))
    return response


def run_llm(user_input):
    return 'You got me; backend is not implemented yet!'


if __name__ == '__main__':
    main()
