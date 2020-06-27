const sqlite3 = require('sqlite3').verbose();
const db = connect();

function connect(){
    let db_instance = new sqlite3.Database('system_db', (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Database connection established.');
        }
    });
    return db_instance;
}

function createPostsTable(){
    db.serialize(function(){
        db.run('CREATE TABLE IF NOT EXISTS posts (id INT PRIMARY KEY, title TEXT, content TEXT)');
    });
    db.close();
}

function createUsersTable(){
    db.serialize(function(){
        db.run('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, username TEXT, password TEXT)');
    });
    db.close();
}

function manualUsers(id, username, password){
    db.serialize(()=>{
        var stmt = db.prepare('INSERT INTO users VALUES (?, ?, ?)');
        stmt.run(id, username, password);
        stmt.finalize();
    });
    db.close();
}

function manualPosts(id, title, content){
    db.serialize(()=>{
        var stmt = db.prepare('INSERT INTO posts VALUES (?, ?, ?)');
        stmt.run(id, title, content);
        stmt.finalize();
    });
    db.close();
}

function addPost(title, content){
    db.serialize(function(){
        var stmt = db.prepare('INSERT INTO posts VALUES (?, ?, ?)');
        getNextID('posts')
        .then((id)=>{
            stmt.run(id, title, content);
            stmt.finalize();
        });
        // stmt.run(id, content);
        // stmt.finalize();
    });
    db.close();
}

function updatePost(id, content, title){
    db.serialize(function(){
        db.run(`UPDATE posts SET content='${ content }',title='${ title }' WHERE id=${ id }`, (err)=> {
            if(err){
                console.log(err);
            }
            else{
                console.log('Entry updated');
            }
        });
    });
}

// const nextID = new Promise((resolve, reject)=>{
//     var id;
//     db.get('SELECT id FROM posts WHERE id=(SELECT MAX(id) FROM posts)', (err, row)=>{
//         if(err){
//             console.log(err);
//             reject(err);
//         }
//         else{
//             id = row.id + 1;
//             resolve(id);
//         }
//     });
// });

// nextID.then(id => console.log(id));

function getPost(id){
    db.serialize(function(){
        db.get(`SELECT content FROM posts WHERE id=${ id }`, (err, row)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(row.content);
            }
        });
    });
}

function getNextID(table){
    return new Promise((resolve,reject)=>{
        var id;
        db.get(`SELECT id FROM ${ table } WHERE id=(SELECT MAX(id) FROM ${ table })`, (err, row)=>{
            if(err){
                reject(err);
            }
            else{
                id = row.id + 1;
                resolve(id);
            }
        });
    });
}

function nextID(){
    getNextID('posts').then(id => console.log(id));
}

function getAllBlogPosts(){
    db.serialize(function(){
        db.each('SELECT * FROM posts', (err, row)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('id: ' + row.id);
                console.log('title: ' + row.title);
                console.log('content: ' + row.content);
            }
        });
    });
    db.close();
}

function getAllUsers(){
    db.serialize(function(){
        db.each('SELECT * FROM users', (err, row)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('id: ' + row.id);
                console.log('username: ' + row.username);
                console.log('password: ' + row.password);
            }
        });
    });
    db.close();
}

module.exports = {getAllUsers : getAllUsers, manualUsers : manualUsers, createUsersTable : createUsersTable, manualPosts : manualPosts, nextID : nextID, connect : connect, getNextID : getNextID, createPostsTable : createPostsTable, getAllBlogPosts : getAllBlogPosts, getPost : getPost, addPost : addPost, updatePost : updatePost};
