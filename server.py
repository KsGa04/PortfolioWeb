import json
import os
import webbrowser

from flask import Flask, render_template, request
import smtplib
from email.mime.text import MIMEText

root_dir = os.path.dirname(os.path.abspath(__file__))

template_folder = os.path.join(root_dir, "templates")
static_directory = os.path.join(root_dir, "static")

app = Flask(__name__, static_folder=static_directory, template_folder=template_folder)


def send_email(nameUser, messageUser):
    mailto_link = f"mailto:k_prog@br.ru?subject=Message from {nameUser}&body={messageUser}"
    webbrowser.open(mailto_link)


@app.route('/')
def index():
    return render_template('Main.html')


@app.route('/send_email', methods=['POST'])
def handle_email_send():
    name = request.form['nameUser']
    message = request.form['messageUser']

    send_email(name, message)

    return 'Email sent successfully!'


if __name__ == '__main__':
    app.run(debug=True)
