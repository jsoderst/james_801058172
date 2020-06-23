const db = require("./db");

// console.log(db.addPost('This is a second fake blog post.'));

db.getAllBlogPosts();

console.log(db.getNextID("posts"));