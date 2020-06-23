const sqlite3 = require('sqlite3').verbose(); 

function connect(){
    let db = new sqlite3.Database('system_db', (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Database connection established.');
        }
    });
    return db;
}

function getNextID(table){
    var db = connect();
    var nextID;

    db.serialize(function(){
        db.each(`SELECT id FROM ${ table } WHERE id=(SELECT MAX(id) FROM ${ table })`, (err, row)=>{
            if(err){
                console.log(err);
            }
            else{
                nextID = row.id + 1;
            }
        });
    });

    if(nextID === undefined){
        nextID = 1;
    }

    db.close();
    return nextID;
}

function createPostsTable(){
    var db = connect();

    db.serialize(function(){
        db.run('CREATE TABLE IF NOT EXISTS posts (id INT PRIMARY KEY, content TEXT)');
    });

    db.close();
}

function addPost(content){
    var db = connect();
    var id = getNextID('posts');

    db.serialize(function(){
        var stmt = db.prepare('INSERT INTO posts VALUES (?, ?)');
        stmt.run(id, content);
        stmt.finalize();
    });

    db.close();
}

function getAllBlogPosts(){
    var db = connect();

    db.serialize(function(){
        db.each('SELECT * FROM posts', (err, row)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('id: ' + row.id);
                console.log('content: ' + row.content);
            }
        });
    });

    db.close();
}

module.exports = {createPostsTable : createPostsTable, getNextID : getNextID, getAllBlogPosts : getAllBlogPosts, addPost : addPost};
