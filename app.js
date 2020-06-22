const express = require('express');
const app = express();
const path = require('path');
// const bodyparser = require('body-parser');
// const joi = require('@hapi/joi');
// const ejs = require('ejs');
const fs = require('fs');
// const sqlite3 = require(sqlite3).verbose();

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

app.listen(3000);
