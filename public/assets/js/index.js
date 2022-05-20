let noteTitle = document.getElementById("note-title1");
let noteText = document.getElementById("note-textarea1");
let saveNoteBtn = document.getElementById("save-note1");
let newNoteBtn;
let noteList = document.getElementById("list-group");

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// const getNotes = (note) =>
//   fetch("/api/notes", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(note),
//   });

function getNotes() {
  const myRequest = new Request("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  });

  fetch(myRequest)
    .then((response) => response.json())
    .then((note) => {
      let { data } = note;
      data.forEach((item, key) => {
      console.log(data);
      let textContent = document.createTextNode(JSON.stringify(item.title));
      let li = document.createElement("li");
      li.appendChild(textContent);
      document.getElementById("list-group1").appendChild(li);
      });
      console.log("Success:", note);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(myRequest);
}

getNotes();

function saveNote(note) {
  note = { title: noteTitle.value, text: noteText.value };
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((note) => {
      console.log("Success:", note);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
saveNoteBtn.addEventListener("click", saveNote);

//Delete Note
const deleteNote = (id) => ({});
