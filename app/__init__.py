from flask import Flask, render_template, request, session, redirect, flash, url_for
from flask_socketio import SocketIO, join_room, emit

app = Flask(__name__)
app.secret_key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
socketio = SocketIO(app)

@app.get('/')
def home_get():
  return render_template("index.html")

@app.get('/game')
def game_get():
  return render_template("game.html")

@app.get('/editor')
def editor_get():
  return render_template("editor.html")

@app.after_request
def remove_cache(response):
  response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
  response.headers['Pragma'] = 'no-cache'
  response.headers['Expires'] = '0'
  return response

if __name__ == "__main__":
  app.run(debug=True)
