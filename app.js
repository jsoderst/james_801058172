// const joi = require('@hapi/joi');
// const ejs = require('ejs');
// const common = require('./static/scripts/common');
// const eventEmitter = require('events');
// const EventEmitter = require('events');
// const eventEmitter = new EventEmitter;
// const postURI = '/post?id=';
const db = require('./db');
const bodyparser = require('body-parser');
const multer = require('multer');
// const upload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { urlencoded } = require('express');
// const { urlencoded } = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const upload = multer({dest: './uploads'});

const dbHandler = new sqlite3.Database('system_db', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Database connection established in app.js');
    }
});

function getPostContent(id){
    return new Promise((reject, resolve)=>{
        dbHandler.get(`SELECT content FROM posts WHERE id=${id}`, (err, row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row.content);
            }
        });
    });
}

io.on('connect', socket =>{
    console.log('connection established');

    socket.on('postContent', postContent=>{
        dbHandler.get(`SELECT id FROM posts WHERE content='${ postContent}'`, (err, row)=>{
            if(err){
                console.log(err);
            }
            else(socket.emit('postID', row.id));
        });
    });

    socket.on('getEntries', ()=>{
        getSliderEntries.then(result=>{socket.emit('sliderEntries', result)});
    });
});

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/public', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res)=>{
    dbHandler.get('SELECT content FROM posts WHERE id=1', (err, row)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('index', {first_post: row.content});
        }
    });
});

const getSliderEntries = new Promise((resolve, reject)=>{
    var entries = [];
    for (var i = 1; i < 4; i++){
        dbHandler.get(`SELECT content FROM posts WHERE id=${ i }`, (err, row)=>{
            if(err){
                reject(err);
            }
            else{
                entries.push(row.content);
            }
        });
    }
    resolve(entries);
});

const posts = new Promise((resolve, reject)=>{
    var result = [];
    dbHandler.each('SELECT id,title FROM posts', (err, row)=>{
        if(err){
            reject(err);
        }
        else{
            result.push({post_id: row.id, post_title: row.title});
        }
    });
    resolve(result);
});

const users = new Promise((resolve, reject)=>{
    var result = [];
    dbHandler.each('SELECT id,username FROM users', (err, row)=>{
        if(err){
            reject(err);
        }
        else{
            result.push({user_id: row.id, username: row.username});
        }
    });
    resolve(result);
});

app.get('/list_posts', (req, res)=>{
    posts.then(result => res.render('list_posts', {posts: result}));
});

app.get('/post', (req, res)=>{
    console.log(req.query);
    if(!(Object.keys(req.query).length)){
        dbHandler.get('SELECT title,content FROM posts WHERE id=1', (err, row)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render('post', {content: row.content, title: row.title});
            }
        });
    }
    else{
        dbHandler.get(`SELECT title,content FROM posts WHERE id=${ req.query.id }`, (err, row)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render('post', {content: row.content, title: row.title});
            }
        });
    }
});

app.get('/update_post', (req, res)=>{
    dbHandler.get(`SELECT title,content FROM posts WHERE id=${ req.query.id }`, (err, row)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('update_post', {id: req.query.id, title: row.title, content: row.content});
        }
    });
});

app.get('/add_post', (req, res)=>{
    res.render('add_post');
});

app.post('/add_post', (req, res)=>{
    console.log(req.body);
    db.addPost(req.body.title, req.body.content);
});

app.post('/upload', upload.single('upload'), (req, res)=>{
    var title = req.body.title;
    fs.readFile('./uploads/' + req.file.filename, 'utf-8', (err, data)=>{
        db.addPost(title, data);
    });
    setTimeout(()=>{
        res.send('File uploaded');
    }, 5000);
});

app.post('/update_post', (req, res)=>{
    setTimeout(()=>{
        res.redirect('/');
    }, 3000);
    db.updatePost(req.query.id, req.body.content, req.body.title);
});

app.get('/add_user', (req, res)=>{
    res.render('add_user');
});

app.get('/list_users', (req, res)=>{
    users.then(result => res.render('list_users', {users: result}));
});

app.get('/user', (req, res)=>{
    dbHandler.get(`SELECT username,password FROM users WHERE id=${ req.query.id }`, (err, row)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('user', {username: row.username, password: row.password});
        }
    });
});

app.get('/update_user', (req, res)=>{
    dbHandler.get(`SELECT username,password FROM users WHERE id=${ req.query.id }`, (err, row)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('update_user', {id: req.query.id, username: row.username, password: row.password});
        }
    });
});

app.get('/delete_user', (req, res)=>{
    dbHandler.get(`SELECT username,password FROM users WHERE id=${ req.query.id }`, (err, row)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('delete_user', {id: req.query.id, username: row.username, password: row.password});
        }
    });
});

server.listen(3000, console.log('Server running on port 3000'));
