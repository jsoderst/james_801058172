const express = require('express');
const app = express();
const path = require('path');
// const bodyparser = require('body-parser');
// const joi = require('@hapi/joi');
// const ejs = require('ejs');
const fs = require('fs');
// const sqlite3 = require(sqlite3).verbose();

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/images/home-background.jpeg', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static/images', 'home-background.jpeg'));
});

// serving static css files
fs.readdir('static/stylesheets', (err, files)=>{
    if(err){
        console.log(err);
    }
    else{
        for (let file of files){
            app.get('/stylesheets/' + file, (req, res)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.sendFile(path.join(__dirname, 'static/stylesheets', file));
                }
            });
        }
    }
});

fs.readdir('static/scripts', (err, files)=>{
    if(err){
        console.log(err);
    }
    else{
        for (let file of files){
            app.get('/scripts/' + file, (req, res)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.sendFile(path.join(__dirname, 'static/scripts', file));
                }
            });
        }
    }
});

app.get('/post', (req, res)=>{
    console.log(req.query);
    if(!(Object.keys(req.query).length)){
        res.render('post', {post_id: 'this should just be a random post or a fixed post for when no query string passed'});
    }
    else{
    res.render('post', {post_id: 'this will render a post using the id given in query string'});
    }
});

app.listen(3000);
