console.log("WELCOME TO NOTES APP:-");
showNotes();//function for making the card doc which displays the notes

var elem = document.querySelector("#btn");//button
elem.addEventListener("click", function () {
    let txt = document.querySelector("#txt");
    let nodeObj;
    let notes = localStorage.getItem("NOTE");
    let title = localStorage.getItem("TITLE");
    if (notes == null) {
        nodeObj = [];
    }
    else {
        nodeObj = JSON.parse(notes);//converts string into array
    }

    nodeObj.push(txt.value);
    localStorage.setItem("NOTE", JSON.stringify(nodeObj));
    txt.value = "";

    let titl = prompt("Enter title of your note");
    let titlObj;
    if (title == null) {
        titlObj = [];
    }
    else {
        titlObj = JSON.parse(title);
    }

    titlObj.push(titl);
    localStorage.setItem("TITLE", JSON.stringify(titlObj));

    showNotes();//function for making the card doc which displays the notes

});
//FUNCTION TO SHOW ELEMEMTS FROM LOCAL STORAGE
function showNotes() {
    var targ = document.querySelector("#show");
    let note = localStorage.getItem("NOTE");
    let noteObj = JSON.parse(note);
    let titlObj = JSON.parse(localStorage.getItem("TITLE"));

    let html = "";
    let len = JSON.parse(localStorage.getItem("NOTE"));
    if (len == null) {
        targ.innerHTML = `<h5 align="center">
        <br>
        <br>
        YOU HAVE NOT ADDED ANY NOTES YET. 
        <br>
        KINDLY WRITE YOUR NOTES AND CLICK THE *ADD NOTE* BUTTON</h5> `
        return;
    }
    else if (len.length == 0) {
        targ.innerHTML = `<h5 align="center">
        <br>
        <br>
        YOU HAVE NOT ADDED ANY NOTES YET. 
        <br>
        KINDLY WRITE YOUR NOTES AND CLICK THE *ADD NOTE* BUTTON</h5> `
        return;
    }
    //   <div class=z style="display: flex;justify-content: space-between;>      
    //   <h1 class="card-title" style="float:left;"> ${titlObj[i]}</h1>   
    //   <button align="right" type="button" class="btn btn-primary" style="float:right" ><span class="glyphicon glyphicon-star"></span>*</button>
    //   </div>
    else {
        for (let i = 0; i < noteObj.length; i++) {
            html += `
            <div class="card  my-3 mx-3" style="width: 18rem;">
    <div class="card-body">
    <div class="z" style="display: flex;justify-content: space-between;">
    <h4 class="card-title""> ${titlObj[i]}</h4>
    <button align="right" type="button" onclick="favadd(this.id)" class="btn btn-primary" style="float:right" id="${i}"><span class="glyphicon glyphicon-star"></span>*</button>
    </div>
    <hr style="width:100%;">
    <p class="card-text">${noteObj[i]}</p>
      <button class="btn btn-primary" id="${i}" onclick="deletee(this.id)">DELETE NOTE</button>

    </div>
  </div>`;
        }
        targ.innerHTML = html;
    }
}



function deletee(index) {
    console.log("I am deleting", index);
    localStorage.removeItem("favidx");
    let notes = localStorage.getItem("NOTE");
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let title = localStorage.getItem("TITLE");
    let titlObj;
    if (title == null) {
        titlObj = [];
    }
    else {
        titlObj = JSON.parse(title);
    }
    notesObj.splice(index, 1);
    titlObj.splice(index, 1);
    localStorage.setItem("NOTE", JSON.stringify(notesObj));
    localStorage.setItem("TITLE", JSON.stringify(titlObj));
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

//now we will work on favourite button
function favadd(idx) {
    console.log(idx);
    let favidx = localStorage.getItem("favidx");
    let favObj;
    if (favidx == null) {
        favObj = [];
    }
    else {
        favObj = JSON.parse(favidx);
    }
    favObj.push(idx);
    localStorage.setItem("favidx", JSON.stringify(favObj));
};

//now displaying favourite notes
let favBtn = document.querySelector("#favBtn");
favBtn.addEventListener("click", function (e) {
    let cards = Array.from(document.querySelectorAll(".card"));
    let idxObj = JSON.parse(localStorage.getItem("favidx"));
    for (let i = 0; i < cards.length; i++) {
        let flag = 0;
        for (let j = 0; j < idxObj.length; j++) {
            if (idxObj[j] == i)
                flag = 1;
        }

        if (flag == 1)
            cards[i].style.display = "block";
        else
            cards[i].style.display = "none";
    }

})

let allBtn = document.querySelector("#allBtn");
allBtn.addEventListener("click", function (e) {
    showNotes();
})
