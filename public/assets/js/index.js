let noteTitle = document.getElementById("note-title1");
let noteText = document.getElementById("note-textarea1");
let saveNoteBtn = document.getElementById("save-note1");
let newNoteBtn;
let noteList;

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

const getNotes = (note) =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

function saveNote() {
  const data = { title: noteTitle.value, text: noteText.value };
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
saveNoteBtn.addEventListener("click", saveNote);

//Delete Note
const deleteNote = (id) => ({});
