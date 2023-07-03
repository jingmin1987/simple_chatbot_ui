import time
from flask import Flask, render_template, request


app = Flask(__name__, static_folder='static')
FULL_RESPONSE = {}


@app.route("/")
def main():
    return render_template('chatbot_ui.html')


@app.route("/get")
def get_llm_response():
    user_input = request.args.get('user_input')
    user_response = parse_user_input(user_input)
    FULL_RESPONSE.update(user_response)

    needed_keys = ['age', 'income']  # To be updated
    missing_input = find_missing_input(needed_keys, FULL_RESPONSE)
    time.sleep(0.25)
    if missing_input:
        return f'Please provide me your {missing_input[0]}'
    else:
        return run_optimization(FULL_RESPONSE)


def parse_user_input(user_input) -> dict:
    # Run LLM to parse
    return dict()


def find_missing_input(needed_keys, response: dict) -> list:
    """
    Finds what information is missing from all the responses so far
    :param needed_keys: needed keys
    :param response: a given response dict
    :return:
    """

    missing_keys = [k for k in needed_keys if k not in response]

    return missing_keys


def run_optimization(response: dict):
    # optimization + LLM
    return 'You got me; backend is not implemented yet!'


if __name__ == '__main__':
    main()
