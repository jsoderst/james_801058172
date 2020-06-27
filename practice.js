const { create } = require("lodash");

const posts = [
    { title: 'post one', body: 'post one body' },
    { title: 'post two', body: 'post two body' }
];

function getPosts() {
    setTImeout(()=>{
        let output = '';
        posts.forEach((post)=>{
            output += `<li>${post.title}</li>`
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post){
    setTimeout(()=>{
        posts.push(post);
    }, 2000)
}

getPosts();

createPost({title: 'Post three', body: 'this is post three'});