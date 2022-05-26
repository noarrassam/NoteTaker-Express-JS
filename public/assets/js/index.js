let noteTitle = document.getElementById("note-title");
let noteText = document.getElementById("note-textarea");
let saveNoteBtn = document.getElementById("save-note");
let newNoteBtn;
let noteList = document.getElementById("list-group");
var text = document.getElementById("textDesc");
let arr = [];

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
      data.forEach((item, key) => {
        console.log(data);

        let textContent = document.createTextNode(item.title);
        let li = document.createElement("li");
        li.setAttribute("id", "liElements");

        var deleteBtn = document.createElement("button");
        deleteBtn.id = item.id;
        deleteBtn.textContent = "Completed";
        console.log(deleteBtn.id);

        if (deleteBtn != null) {
          deleteBtn.addEventListener("click", () => deleteNote(item.id), false);
        }

        li.appendChild(textContent);
        if (noteList != null) {
          noteList.appendChild(li);
          noteList.appendChild(deleteBtn);
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

if (saveNoteBtn != null) {
  saveNoteBtn.addEventListener("click", saveNote, false);
}

// Delete Note
function deleteNote(id) {
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
      console.log("Success:", message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
