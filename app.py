import json
import os
import webbrowser
from os.path import join, dirname, realpath

from flask import Flask, render_template, request, jsonify, send_file
import smtplib
from email.mime.text import MIMEText

root_dir = os.path.dirname(os.path.abspath(__file__))

template_folder = os.path.join(root_dir, "templates")
static_directory = os.path.join(root_dir, "static")

app = Flask(__name__, static_folder=static_directory, template_folder=template_folder)

# Словарь с изображениями для каждого проекта
project_images = {
    "project1": ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png"],
    "project2": ["Picture1.png", "Picture2.png", "Picture3.png", "Picture4.png", "Picture5.png", "Picture6.png",
                 "Picture7.png", "Picture8.png", "Picture9.png", "Picture10.png"],
    "project3": ["bot1.png", "bot2.png", "bot3.png", "bot4.png"],
    "project4": ["Picture1.jpg", "Picture2.jpg", "Picture3.jpg", "Picture4.jpg", "Picture5.jpg", "Picture6.jpg"],
    "project5": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"],
    "project6": ["screen1.png", "screen2.png", "screen3.png", "screen4.png", "screen5.png", "screen6.png"]
}

# Текущий индекс для каждого проекта
current_indices = {project: 0 for project in project_images}


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


@app.route('/get_image/<project_name>', methods=['GET'])
def get_image(project_name):
    global current_indices
    current_index = current_indices[project_name]
    return jsonify({'image': project_images[project_name][current_index]})


@app.route('/next_image/<project_name>', methods=['POST'])
def next_image(project_name):
    global current_indices
    current_index = current_indices[project_name]
    current_indices[project_name] = (current_index + 1) % len(project_images[project_name])
    return jsonify({'image': project_images[project_name][current_indices[project_name]]})


@app.route('/prev_image/<project_name>', methods=['POST'])
def prev_image(project_name):
    global current_indices
    current_index = current_indices[project_name]
    current_indices[project_name] = (current_index - 1) % len(project_images[project_name])
    return jsonify({'image': project_images[project_name][current_indices[project_name]]})


@app.route('/download/Rezyume.pdf', methods=['GET'])
def download_file():
    file_path = join(dirname(realpath(__file__)), 'Rezyume.pdf')
    return send_file(file_path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
