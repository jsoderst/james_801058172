// class db_instance {
//     constructor(){
//         const sqlite3 = require(sqlite3).verbose();
//     }

//     connect(){
//         const db = new sqlite3.Database('system_db', (err)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log('Database connection established');
//             }
//         });
//     }

//     createUsersTable(){
//         db.run('CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)');
//         var stmt = db.prepare('INSERT INTO users VALUES (?, ?)');
//         for (var i = 0; i < 5; i++){
//             var a = i;
//             var b = 'James';
//             stmt.run(a, b);
//         }
    
//         stmt.finalize();
    
//         db.each('SELECT id,name FROM users WHERE id=1', function(err, row){
//             console.log('id: ' + row.id);
//             console.log('name: ' + row.name);
//         });
    
//         db.close;
//     }
// }

// module.exports = {db_instance : db_instance};

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

function CreateUsersTable(body){
    var db = connect();

    db.serialize(()=>{
        db.run('CREATE TABLE IF NOT EXISTS posts (id INT, body TEXT)');
        var stmt = db.prepare('INSERT INTO users VALUES (?, ?)');
        for (var i = 0; i < 5; i++){
            stmt.run(i, body);
        }

        stmt.finalize();

        db.each(`SELECT id,name FROM users WHERE name='${ body }'`, (err,row)=>{
            console.log('id: ' + row.id);
            console.log('name: ' + row.name);
        });

        //find max id and create next id 
        var table = 'users';
        db.each(`SELECT id FROM ${ table } WHERE id=(SELECT MAX(id) FROM ${ table })`, (err,row)=>{
            console.log(row.id);
            nextID = row.id + 1;
            console.log(nextID);
        });

        db.close;
    });
}

module.exports = {connect : connect, CreateUsersTable : CreateUsersTable};
