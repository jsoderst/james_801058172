const db = require('../../db');
// const common = require('./static/scripts/common');
// const app = require('./app');

// common.getContents.then(id => console.log(id));

// function test(){
//     document.getElementById('test').innerHTML = 'hello';
//     return "this is a test";
// }
// db.addPost('This is just a sample blog entry to help demo the slider capability.');

db.getAllBlogPosts();
// console.log(db.getNextID("posts"));

// id = db.getNextID('posts');
// console.log(id);
// console.log(nextID);

// db.getNextID('posts');

// db.nextID();

// db.addPost('this will hopefully have id 5');

// db.getAllBlogPosts();

// db.manualPosts(1, 'First Post', 'This is the first post.');
// db.manualPosts(2, 'Second Post', 'This is the second post.');
// db.manualPosts(3, 'Third Post', 'This is the third post.');

// module.exports = {test : test};
