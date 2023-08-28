let blenderCount = 0;

const tab0 = document.querySelector("#Tab0");
const tab1 = document.querySelector("#Tab1");
const tab2 = document.querySelector("#Tab2");
const tab3 = document.querySelector("#Tab3");

function blenderSwitch(type){
    const canvas = document.querySelector("#blenderProject" + blenderCount);
    let currentID = canvas.id;
    currentID = currentID.replace("blenderProject", "");

    if (type == "next"){
        if (blenderCount + 1 > 3){
            blenderCount = 0;
        } else{
            blenderCount++;
        }
    } else{
        if (blenderCount -1 < 0){
            blenderCount = 3;
        } else{
            blenderCount--;
        }
    }

    canvas.style.display = "none";
    document.querySelector("#blenderProject" + blenderCount).style.display = "inline-block";
}

function unitySwitch(type){
    const canvas = document.querySelector("#unity" + blenderCount);
    let currentID = canvas.id;
    currentID = currentID.replace("unity", "");

    if (type == "next"){
        if (blenderCount + 1 > 3){
            blenderCount = 0;
        } else{
            blenderCount++;
        }
    } else{
        if (blenderCount -1 < 0){
            blenderCount = 3;
        } else{
            blenderCount--;
        }
    }

    canvas.style.display = "none";
    document.querySelector("#unity" + blenderCount).style.display = "inline-block";
}

function thirdSwitch(type){
    const canvas = document.querySelector("#third" + blenderCount);
    let currentID = canvas.id;
    currentID = currentID.replace("third", "");

    if (type == "next"){
        if (blenderCount + 1 > 3){
            blenderCount = 0;
        } else{
            blenderCount++;
        }
    } else{
        if (blenderCount -1 < 0){
            blenderCount = 3;
        } else{
            blenderCount--;
        }
    }

    canvas.style.display = "none";
    document.querySelector("#third" + blenderCount).style.display = "inline-block";
}

function fourthSwitch(type){
    const canvas = document.querySelector("#fourth" + blenderCount);
    let currentID = canvas.id;
    currentID = currentID.replace("fourth", "");

    if (type == "next"){
        if (blenderCount + 1 > 3){
            blenderCount = 0;
        } else{
            blenderCount++;
        }
    } else{
        if (blenderCount -1 < 0){
            blenderCount = 3;
        } else{
            blenderCount--;
        }
    }

    canvas.style.display = "none";
    document.querySelector("#fourth" + blenderCount).style.display = "inline-block";
}

function tabChange(button, type){
    if(type == "blender"){
        tab0.className = "projectView";
        tab0.classList.add('animateTabs')
        tab1.className = "projectView";
        tab2.className = "projectView";
        tab3.className = "projectView";
    } else if(type == "unity"){
        tab0.className = "projectView";
        tab1.className = "projectView";
        tab1.classList.add('animateTabs');
        tab2.className = "projectView";
        tab3.className = "projectView";
    }else if(type == "third"){
        tab0.className = "projectView";
        tab1.className = "projectView";
        tab2.className = "projectView";
        tab2.classList.add('animateTabs');
        tab3.className = "projectView"
    }else if(type == "fourth"){
        tab0.className = "projectView";
        tab1.className = "projectView";
        tab2.className = "projectView";
        tab3.className = "projectView";
        tab3.classList.add('animateTabs');
    }
    
}

function showContacts(){
    const contactsMenu = document.querySelector('#LinksContainer');

    //toggle this

    if (contactsMenu.className == "animatedContainer"){
        contactsMenu.className = "";
    } else{
        contactsMenu.className = "animatedContainer";
    }

    //check if class==animated

    //is not add it
    //if yes, remove it
}
