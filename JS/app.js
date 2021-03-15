function addNote() {

    let titleText = document.getElementById("noteTitle")
    let titleTextNode = document.createTextNode(titleText.value);

    let textArea = document.getElementById("addText");
    let textNode = document.createTextNode(textArea.value);

    let key = firebase.database().ref().push().key;

    if (textArea.value == "" || titleText.value == "") {
        alert(`Please Fill All The Required Field`);
    }
    else {
        let noteParent = document.getElementById("notes");
        let parentDiv = document.createElement("div");
        parentDiv.setAttribute("class", "card");
        parentDiv.setAttribute("style", "width: 18rem;");
        let div = document.createElement("div");
        div.setAttribute('class', 'card-body');

        // Note title
        let noteTitle = document.createElement("h5");
        noteTitle.setAttribute("class", "card-title");

        noteTitle.appendChild(titleTextNode);
        div.appendChild(noteTitle);
        
        let noteCard = document.createElement("p");
        noteCard.setAttribute('class', 'card-text');

        noteCard.appendChild(textNode);
        noteParent.appendChild(parentDiv);
        parentDiv.appendChild(div);
        div.appendChild(noteCard);
        
        //Delete BUTTON
        let btn = document.createElement("button");
        btn.setAttribute("class", "btn btn-primary");
        btn.setAttribute("onclick","removeData()")
        btnText = document.createTextNode("Delete Note");
        btn.appendChild(btnText);
        div.appendChild(btn);
        alert("Note Added Successfull")
        
        //firebase database add function
        
        let myTitle=document.getElementById("noteTitle");
        let myNoteText=document.getElementById("addText");
        
        let userData = {
            Title: myTitle.value,
            Note: myNoteText.value,
            key: key
        }
        firebase.database().ref("Client /" + key).set(userData)
        console.log(userData)

        titleText.value = "";
        textArea.value = '';
    }
    
}

// .........FIREBASE GET DATA METHOD......
function getData() {
    firebase.database().ref().on("value",function(userData) {
        console.log(userData.val());
    })
}

getData();


// firebase DELETE FUNCTION
function removeData() {
    firebase.database().ref("Client ").remove();
}
