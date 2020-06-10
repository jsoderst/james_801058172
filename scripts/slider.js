/*
This script is used to provide the text slider functionality.

It loops through three different blog posts at 5 second intervals, beginning when the play button is clicked.

Clicking the stop button will terminate the loop. The loop will begin where it left off if the play button is clicked again.
*/

document.getElementById("play-slides").addEventListener("click", start);
document.getElementById("stop-slides").addEventListener("click", stopSlides);

var entryText = ["This is just a sample blog entry to help demo the slider capability.", "This is another sample blog post that is meant to illustrate the slider capability. It is the second blog post from this award-winning series.", "This is the captivating finale to the three-part blog post entry series meant to illustrate the slider capability. What a wild ride it has been."];
var index = 1;
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
