let noteTitle = document.getElementById("note-title");
let noteText = document.getElementById("note-textarea");
let saveNoteBtn = document.getElementById("save-note");
let newNoteBtn = document.getElementById("new-note");
let noteList = document.getElementById("list-group");
var text = document.getElementById("textDesc");
var elId = document.getElementById("note-id");
let arr = [];
var deleteBtn = document.getElementById("deleteBtn");
var li = document.getElementById("li");

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

      if (newNoteBtn != null) {
        newNoteBtn.addEventListener("click", function () {
          location.href = "/notes";
        });
      }

      data.forEach((item, key) => {
        console.log(data);

        li = document.createElement("li");
        li.setAttribute("id", `li-${item.id}`);
        newNotes(li, item.title);

        deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "deleteBtn");
        appendDeleteBtn(deleteBtn, item.id);

        if (deleteBtn != null) {
          deleteBtn.addEventListener(
            "click",
            (e) => {
              console.log(e, e.target);
              deleteNote(item.id, e.target);
            },
            false
          );
        }

        li.addEventListener("click", function () {
          localStorage.setItem("key", JSON.stringify(item.text));
          location.href = "/text";
        });

        if (localStorage.getItem("key") == null) {
          arr = [];
        } else {
          arr = JSON.parse(localStorage.getItem("key"));
          if (text != null) {
            text.innerHTML = arr;
          }
        }
        console.log(item);
      });
      console.log("Success:", note);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(myRequest);
}

getNotes();

function newNotes(li, title) {
  let textContent = document.createTextNode(title);
  li.appendChild(textContent);
  if (noteList != null) {
    noteList.appendChild(li);
  }
}

function appendDeleteBtn(deleteBtn, id) {
  elId = id;
  deleteBtn.textContent = "Delete";
  if (noteList != null) {
    noteList.appendChild(deleteBtn);
  }
}

function deletedNote(li, deleteBtn) {
  hide(li);
  hide(deleteBtn);
}

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
      li = document.createElement("li");
      li.setAttribute("id", `li-${note.data.id}`);

      li.addEventListener("click", function () {
        localStorage.setItem("key", JSON.stringify(note.data.text));
        location.href = "/text";
      });

      if (localStorage.getItem("key") == null) {
        arr = [];
      } else {
        arr = JSON.parse(localStorage.getItem("key"));
        if (text != null) {
          text.innerHTML = arr;
        }
      }

      deleteBtn = document.createElement("button");
      deleteBtn.addEventListener(
        "click",
        (e) => {
          deleteNote(note.data.id, e.target);
        },
        false
      );
      newNotes(li, note.data.title),
        appendDeleteBtn(deleteBtn, note.data.id),
        console.log("Success:", note);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

if (saveNoteBtn != null) {
  saveNoteBtn.addEventListener("click", saveNote, false);
}

// Delete Note
function deleteNote(id, deleteBtn) {
  const myRequest = new Request(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  });

  fetch(myRequest)
    .then((res) => res.json())
    .then((message) => {
      deletedNote(document.getElementById(`li-${id}`), deleteBtn);
      console.log("Success:", message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
