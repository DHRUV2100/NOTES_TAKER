console.log("WELCOME TO NOTES APP");
showNotes();//function for making the card doc which displays the notes

var elem = document.querySelector("#btn");//button
elem.addEventListener("click", function () {
    var txt = document.querySelector("#txt");
    var ttl = document.querySelector("#title");
    var nodeObj;
    var notes = localStorage.getItem("NOTE_TITLE");
    if (notes == null) {
        nodeObj = [];
    }
    else {
        nodeObj = JSON.parse(notes);//converts string into array
    }
    //making an object with title and note
    let myObj = {
        title: ttl.value,
        text: txt.value
    };
    nodeObj.push(myObj);
    localStorage.setItem("NOTE_TITLE", JSON.stringify(nodeObj));
    txt.value = "";
    ttl.value = "";
    showNotes();//function for making the card doc which displays the notes

});
//FUNCTION TO SHOW ELEMEMTS FROM LOCAL STORAGE
function showNotes() {
    var targ = document.querySelector("#show");
    let note = localStorage.getItem("NOTE_TITLE");
    let noteObj = JSON.parse(note);
    let html = "";
    if (noteObj == null) {
        targ.innerHTML = `<h5 align="center">
        <br>
        <br>
        YOU HAVE NOT ADDED ANY NOTES YET. 
        <br>
        KINDLY WRITE YOUR NOTES AND CLICK THE *ADD NOTE* BUTTON</h5> `
        return;
    }
    else
    {
    for (let i = 0; i < noteObj.length; i++) {
        html += `<div class="card  my-3 mx-3" style="width: 18rem;">
    <div class="card-body">
      <h1 class="card-title">${noteObj[i].title}</h1>
      <p class="card-text">${noteObj[i].text}</p>
      <button class="btn btn-primary" id="${i}" onclick="deletee(this.id)">DELETE NOTE</button>
    </div>
  </div>`;
    }
    targ.innerHTML = html;
    }
}

function deletee(index) {
    console.log("I am deleting", index);

    let notes = localStorage.getItem("NOTE_TILE");
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("NOTE_TITLE", JSON.stringify(notesObj));
    showNotes();
}

let srch = document.querySelector("#searchTxt");
srch.addEventListener("input", function () {
    var z = document.querySelector("#searchTxt").value;
    // console.log(`EVENT SEARCH FIRED!! , ${z}`);
    var cards = Array.from(document.querySelectorAll(".card"));
    for (let i = 0; i < cards.length; i++) {
        let txt = cards[i].querySelector("p").innerText;
        // console.log(cards[i].querySelector("p").innerText);

        if (txt.includes(z) == true)
            cards[i].style.display = "block";
        else
            cards[i].style.display = "none";
    }

});