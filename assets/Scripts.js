/*
Cooper Bower
HTML/CSS Capstone Project
August 31, 2023
*/

//projcect view change variable
let blenderCount = 0;

//get project tabs
const tab0 = document.querySelector("#Tab0");
const tab1 = document.querySelector("#Tab1");
const tab2 = document.querySelector("#Tab2");
const tab3 = document.querySelector("#Tab3");

//function for the blender tab
function blenderSwitch(type) {
    //get the canvas
    const canvas = document.querySelector("#blenderProject" + blenderCount);
    let currentID = canvas.id;

    //get the index of the canvas
    currentID = currentID.replace("blenderProject", "");

    //increment according to its value
    if (type == "next") {
        if (blenderCount + 1 > 3) {
            blenderCount = 0;
        } else {
            blenderCount++;
        }
    } else {
        if (blenderCount - 1 < 0) {
            blenderCount = 3;
        } else {
            blenderCount--;
        }
    }

    //set display for new and old canvas
    canvas.style.display = "none";
    document.querySelector("#blenderProject" + blenderCount).style.display = "block";
}

//function the unity tab switcher
function unitySwitch(type) {

    //get the current project
    const canvas = document.querySelector("#unity" + blenderCount);
    let currentID = canvas.id;

    //get the current index
    currentID = currentID.replace("unity", "");

    //increment value
    if (type == "next") {
        if (blenderCount + 1 > 2) {
            blenderCount = 0;
        } else {
            blenderCount++;
        }
    } else {
        if (blenderCount - 1 < 0) {
            blenderCount = 2;
        } else {
            blenderCount--;
        }
    }

    //set visibility
    canvas.style.display = "none";
    document.querySelector("#unity" + blenderCount).style.display = "block";
}

//function for the third project tab
function thirdSwitch(type) {
    //get the current tab
    const canvas = document.querySelector("#third" + blenderCount);
    let currentID = canvas.id;

    //get the index of the current project
    currentID = currentID.replace("third", "");

    //increment the value
    if (type == "next") {
        if (blenderCount + 1 > 3) {
            blenderCount = 0;
        } else {
            blenderCount++;
        }
    } else {
        if (blenderCount - 1 < 0) {
            blenderCount = 3;
        } else {
            blenderCount--;
        }
    }

    //set the styles
    canvas.style.display = "none";
    document.querySelector("#third" + blenderCount).style.display = "block";
}

//function the handle the table changing
function tabChange(button, type) {
    if (type == "blender") {
        tab0.className = "projectView";
        tab0.classList.add('animateTabs')
        tab1.className = "projectView";
        tab2.className = "projectView";
    } else if (type == "unity") {
        tab0.className = "projectView";
        tab1.className = "projectView";
        tab1.classList.add('animateTabs');
        tab2.className = "projectView";

    } else if (type == "third") {
        tab0.className = "projectView";
        tab1.className = "projectView";
        tab2.className = "projectView";
        tab2.classList.add('animateTabs');

    } 

}

//function the toggle the github and linkedin logos
function showContacts() {
    const contactsMenu = document.querySelector('#LinksContainer');

    //toggle this

    if (contactsMenu.className == "animatedContainer") {
        contactsMenu.className = "";
    } else {
        contactsMenu.className = "animatedContainer";
    }

    //check if class==animated

    //is not add it
    //if yes, remove it
}

//wait till pages loads to fun typing function
window.onload = function () {
    typeLetter();  //example function call.

    //alert("Some features may not be working, go to the live built at, https://cooper-vr.github.io/websiteBuild/ to see all features working")
}

//function to type the header
function typeLetter() {
    //get header and description
    const name = document.querySelector('.sticky');
    const desc = document.querySelector('#desc');

    //set the end-text
    const descText = "Programmer and 3D Modeler"
    const nameText = 'Cooper Bower'

    //declare the starting indexes
    let index = 0;
    let index2 = 0;

    //create an inverval to type 1 letter every 100millsec.
    const interval = setInterval(() => {
        if (index2 < descText.length) {
            desc.innerHTML += descText[index2];
            index2++;
        } else {
            //clear onces all letters are typed
            clearInterval(interval);
        }

        if (index < nameText.length) {
            name.innerHTML += nameText[index];
            index++;
        }
    }, 100);

}

//get all animated spotes
const sections = document.querySelectorAll('.animatedSpot');
const sections2 = document.querySelectorAll('.animate__animated');

//function to check if the element is in view
function isInViewport(element) {
    //get its transform
    const rect = element.getBoundingClientRect();
    return (
        //return if its showing
        rect.bottom - window.innerHeight / 3 <= (window.innerHeight || document.documentElement.clientHeight) 
    );
}

//function the handle animation toggle
function handleScroll() {
    for(let i = 0; i < sections.length; i++){
        if (isInViewport(sections[i])) {
            sections2[i].classList.add('animate__bounceInUp');
        } else {
            sections2[i].classList = "animate__animated";
        }
    }
}

//add event listener to for scroll
window.addEventListener('scroll', handleScroll);

// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
// of the mouse, set with a mousemove event listener below
var dots = [],
    mouse = {
        x: 0,
        y: 0
    };

// The Dot object used to scaffold the dots
var Dot = function () {
    this.x = 0;
    this.y = 0;
    this.node = (function () {
        var n = document.createElement("div");
        n.className = "trail";
        n.style.pointerEvents = 'none';
        document.body.appendChild(n);
        return n;
    }());
};
// The Dot.prototype.draw() method sets the position of 
// the object's <div> node
Dot.prototype.draw = function () {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
    var d = new Dot();
    dots.push(d);
}

// This is the screen redraw function
function draw() {
    // Make sure the mouse position is set everytime
    // draw() is called.
    var x = mouse.x,
        y = mouse.y;

    // This loop is where all the 90s magic happens
    dots.forEach(function (dot, index, dots) {
        var nextDot = dots[index + 1] || dots[0];

        dot.x = x;
        dot.y = y;
        dot.draw();
        x += (nextDot.x - dot.x) * .6;
        y += (nextDot.y - dot.y) * .6;

    });
}

addEventListener("mousemove", function (event) {
    //event.preventDefault();
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
// everytime the screen repaints via requestAnimationFrame().
function animate() {
    if(screen.width > screen.height){
        if(screen.width > 800){
            draw();
        }
    } else{
        if (screen.height > 800){
            draw();
        }
    }
    requestAnimationFrame(animate);
}

// And get it started by calling animate().
animate();