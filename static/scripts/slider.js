/*
This script is used to provide the text slider functionality.

It loops through three different blog posts at 5 second intervals, beginning when the play button is clicked.

Clicking the stop button will terminate the loop. The loop will begin where it left off if the play button is clicked again.
*/

document.getElementById("play-slides").addEventListener("click", start);
document.getElementById("stop-slides").addEventListener("click", stopSlides);

var entryText = ["This is the first post.", "This is the second post.", "This is the third post."];
var index = 0;
var loop;

function start() {
    loop = setInterval(playSlides, 5000);
}

function playSlides() {
    document.getElementsByClassName("blog-text")[0].innerHTML = entryText[index];

    index++;
    if (index > 2)
    {
        index = 0;
    }
}

function stopSlides() {
    clearInterval(loop);
}
