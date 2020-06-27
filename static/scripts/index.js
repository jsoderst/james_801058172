const post = document.getElementsByClassName("single-blog-entry")[0];
const content = document.getElementsByClassName("blog-text");
document.getElementById("play-slides").addEventListener("click", start);
document.getElementById("stop-slides").addEventListener("click", stopSlides);

const socket = io();
const blogEntries = [];
var index = 1;
var loop;

setTimeout(socket.emit('getEntries'),2000);

socket.on('sliderEntries', entries=>{
    for(let entry of entries){
        blogEntries.push(entry);
    }
});

socket.on('postID', postID =>{
    location.href = `/post?id=${ postID }`;
});

post.addEventListener('click', ()=>{
    var postContent = content[0].innerHTML;
    socket.emit('postContent', postContent.trim());
});

function start() {
    loop = setInterval(playSlides, 5000);
}

function playSlides() {
    document.getElementsByClassName("blog-text")[0].innerHTML = blogEntries[index];

    index++;
    if (index > 2)
    {
        index = 0;
    }
}

function stopSlides() {
    clearInterval(loop);
}