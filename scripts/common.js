document.getElementById("font-resize").addEventListener("click", resizeFont);
document.getElementById("style-switch").addEventListener("click", changeBackground);

function changeBackground(id = -1) {
    /*
    This function is used to change the background banner image and alt text on the blog homepage.

    The function behaves in two different ways:
        1. When the general style switcher link at the top of the page is clicked, it will simply iterate through all possible backgrounds. The background will change each time the style switcher link is clicked.
        2. When one of the 3 buttons on the background is clicked, it will switch to a specific image. Each button is linked to a specific image. Repeatedly clicking the same button will not cause the image to continue to change.
    */

    var backgrounds = ["../static/home-background.jpeg","https://images.pexels.com/photos/627654/pexels-photo-627654.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260", "https://images.pexels.com/photos/1905045/pexels-photo-1905045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"];
    var alts = ["Picture of Road", "Picture of Mountains", "Picture of Water"];

    //to handle the case when a specific button is clicked
    switch(id) 
    {
        case 0:
            document.getElementById("home-background").setAttribute("src", backgrounds[id]);
            document.getElementById("home-background").setAttribute("alt", alts[id]);
            return;
        case 1:
            document.getElementById("home-background").setAttribute("src", backgrounds[id]);
            document.getElementById("home-background").setAttribute("alt", alts[id]);
            return;
        case 2:
            document.getElementById("home-background").setAttribute("src", backgrounds[id]);
            document.getElementById("home-background").setAttribute("alt", alts[id]);
            return;
    }

    //retrieve current background and determine index of next background
    var currentBackground = document.getElementById("home-background").getAttribute("src");
    var index = backgrounds.indexOf(currentBackground) + 1;

    //return to beginning of backgrounds list if end has been reached
    if (index > 2) 
    {
        index = 0;
    }

    //update background image and alt description
    document.getElementById("home-background").setAttribute("src", backgrounds[index]);
    document.getElementById("home-background").setAttribute("alt", alts[index]);
}

function resizeFont() {
    /*
    This function is used to change the font size of the header link text and blog entry text.

    Clicking the font resizer link will cause:
        1. The header link text to alternate between a 20px and 16px size font
        2. The blog entry text to alternate between a 16px and 12px size font
    */

    //retrieve list of header elements
    var headerElements = document.getElementsByClassName("header-link-text");

    //determine current header font size
    var currentSize = window.getComputedStyle(headerElements[0]).fontSize;

    //update header font size depending on current size
    var i;
    for (i = 0; i < headerElements.length; i++)
    {
        if (currentSize == "16px")
        {
            headerElements[i].style.fontSize = "20px";
        }
        else
        {
            headerElements[i].style.fontSize = "16px";
        }
    }

    //retrieve list of blog entry elements
    var entryElements = document.getElementsByClassName("blog-entries");

    //determine current blog entry font size
    currentSize = window.getComputedStyle(entryElements[0]).fontSize;

    //update blog entry font size
    for (i = 0; i < entryElements.length; i++)
    {
        if (currentSize == "16px")
        {
            entryElements[i].style.fontSize = "12px";
        }
        else
        {
            entryElements[i].style.fontSize = "16px";
        }
    }
}
