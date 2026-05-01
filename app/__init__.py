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

if __name__ == "__main__":
  app.run(debug=True)
