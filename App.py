from flask import Flask, send_file, request, session, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
import re
import json
from datetime import datetime, timedelta
from PIL import Image
import os
import mysql.connector
from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv

app = Flask(__name__, static_folder='./front/build', static_url_path='/')
CORS(app)

app.secret_key = 'supersecretkey4321'

load_dotenv()

app.config['MYSQL_HOST'] = os.getenv('MY_SQL_HOST')
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'ppp'
app.config['UPLOAD_FOLDER'] = 'files/'

db = MySQL(app)

UPLOAD_DIR = './files/'


def init():
    scheduler = BackgroundScheduler()
    scheduler.add_job(clean, 'interval', hours=1)
    scheduler.start()

    mydb = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD']
    )
    cursor = mydb.cursor()
    cursor.execute("""
CREATE DATABASE IF NOT EXISTS ppp DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ppp;
CREATE TABLE IF NOT EXISTS accounts (
	id int(11) not null auto_increment,
	username varchar(50) not null,
    password varchar(255) not null,
    PRIMARY KEY (id)
)	ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS files (
	id int(11) not null auto_increment,
	user_id int(11) not null,
    path varchar(100) not null,
    date DATETIME not null,
    PRIMARY KEY (id)
)	ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
""")


def responseMessageJSON(msg, status):
    return jsonify({'message': msg}), status


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/login', methods=['POST'])
def login():
    data = json.loads(request.data)
    if 'username' in data and 'password' in data:
        username = data['username']
        password = data['password']
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = % s AND password = % s', (username, password,))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            msg = 'Logged in successfully !'
            return responseMessageJSON(msg, 200)
        else:
            msg = 'Incorrect username / password !'
    else:
        msg = 'Incorrect request body'
        return responseMessageJSON(msg, 400)
    return responseMessageJSON(msg, 401)


@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return responseMessageJSON('Logged out!', 200)


@app.route('/api/register', methods=['POST'])
def register():
    data = json.loads(request.data)
    if 'username' in data and 'password' in data:
        username = data['username']
        password = data['password']
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = % s', (username,))
        account = cursor.fetchone()
        if account:
            msg = 'Account already exists !'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers !'
        elif not username or not password:
            msg = 'Please fill out the form !'
        else:
            cursor.execute('INSERT INTO accounts VALUES (NULL, % s, % s)', (username, password,))
            db.connection.commit()
            msg = 'You have successfully registered !'
            return responseMessageJSON(msg, 200)
    else:
        msg = 'Please fill out the form !'
    return responseMessageJSON(msg, 400)


@app.route('/api/save', methods=['POST'])
def save():
    if not 'loggedin' in session:
        return responseMessageJSON('Unauthorized!', 401)
    f = request.files['file']
    if not f.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return responseMessageJSON('Not supported file type!', 400)
    now = datetime.now()
    now_str = now.strftime("%Y-%b-%d_%H-%M-%S.%f")
    newfilename = now_str + '_' + session['username'] + '_' + f.filename
    path = UPLOAD_DIR + newfilename
    f.save(path)
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO files VALUES (NULL, % s, % s, %s)',
                   (session['id'], newfilename, now.strftime("%Y-%m-%d %H:%M:%S")))

    img = Image.open(UPLOAD_DIR + newfilename)
    if img.size[0] > img.size[1]:
        multi = 100 / img.size[0]
    else:
        multi = 100 / img.size[1]
    img = img.resize((int(img.size[0] * multi), int(img.size[1] * multi)), Image.ANTIALIAS)
    img.save(UPLOAD_DIR + 'miniature_' + newfilename)

    db.connection.commit()
    return responseMessageJSON('File uploaded successfully', 200)


@app.route('/api/get', methods=['GET'])
def getAll():
    if not 'loggedin' in session:
        return responseMessageJSON('Unauthorized!', 401)
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM files WHERE user_id = % s', (session['id'],))
    files = cursor.fetchall()
    return jsonify(files)


@app.route('/api/download/<id>', methods=['GET'])
def download(id):
    if not 'loggedin' in session:
        return responseMessageJSON('Unauthorized!', 401)
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM files WHERE id = % s', (id,))
    file = cursor.fetchone()
    if not file:
        return responseMessageJSON('Not found!', 404)
    if not file['user_id'] == session['id']:
        return responseMessageJSON('Forbidden!', 403)
    filename = file['path']
    return send_file(UPLOAD_DIR + filename, as_attachment=True)


@app.route('/api/miniature/<id>', methods=['GET'])
def miniature(id):
    if not 'loggedin' in session:
        return responseMessageJSON('Unauthorized!', 401)
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM files WHERE id = % s', (id,))
    file = cursor.fetchone()
    if not file:
        return responseMessageJSON('Not found!', 404)
    if not file['user_id'] == session['id']:
        return responseMessageJSON('Forbidden!', 403)
    filename = file['path']
    return send_file(UPLOAD_DIR + 'miniature_' + filename, as_attachment=True)


@app.route('/api/delete/<id>', methods=['DELETE'])
def deleteFile(id):
    if not 'loggedin' in session:
        return responseMessageJSON('Unauthorized!', 401)
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM files WHERE id = % s', (id,))
    file = cursor.fetchone()
    if not file:
        return responseMessageJSON('Not found!', 404)
    if not file['user_id'] == session['id']:
        return responseMessageJSON('Forbidden!', 403)
    filename = file['path']
    if os.path.exists(UPLOAD_DIR + 'miniature_' + filename):
        os.remove(UPLOAD_DIR + 'miniature_' + filename)
    if os.path.exists(UPLOAD_DIR + filename):
        os.remove(UPLOAD_DIR + filename)
    cursor.execute('DELETE FROM files WHERE id = % s', (id,))
    db.connection.commit()
    return responseMessageJSON('File deleted!', 200)


def clean():
    print('Cleaning...')
    dt = datetime.now() - timedelta(days=7)
    mydb = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )
    cursor = mydb.cursor()
    cursor.execute('SELECT * FROM files WHERE date < \'' + dt.strftime("%Y-%m-%d %H:%M:%S") + '\';')
    files = cursor.fetchall()
    for file in files:
        filename = file[2]
        if os.path.exists(UPLOAD_DIR + 'miniature_' + filename):
            os.remove(UPLOAD_DIR + 'miniature_' + filename)
        if os.path.exists(UPLOAD_DIR + filename):
            os.remove(UPLOAD_DIR + filename)
        print('DELETE FROM files WHERE id = ' + str(file[0]) + ';')
        cursor.execute('DELETE FROM files WHERE id = ' + str(file[0]) + ';')
        mydb.commit()
    print('Cleaning done.')


init()
app.run(host="0.0.0.0")
