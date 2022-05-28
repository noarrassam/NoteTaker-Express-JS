// display list of notes on the side

const noteContainer = document.querySelector(".column is-one-quarter");
const noteList = document.querySelector(".menu-list");

fetch("http://localhost:3000/api/v1/notes")
  .then(function (response) {
    return response.json();
  })
  .then(function (notes) {
    notes.forEach(function (note) {
      noteList.innerHTML += `<li id="list-item" data-id=${note.id}><a id="note" data-id=${note.id} class="menu-item">${note.title}</a><i id="delete" data-id=${note.id} class="fas fa-minus-circle has-text-grey-light hvr-grow"></i></li>`;
    });
  });

// display details of each note

const noteDetail = document.querySelector(".note-detail");

noteList.addEventListener("click", function (event) {
  if (event.target.className === "menu-item") {
    fetch(`http://localhost:3000/api/v1/notes/${event.target.dataset.id}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (note) {
        noteDetail.innerHTML = `<h1 contenteditable="true" id="title" data-id=${note.id} class="subtitle is-2">${note.title}</h1><p contenteditable="true" id="body" data-id=${note.id} class="subtitle is-6">${note.body}</p><a id="save" data-id=${note.id} class="button is-small">Save</a>`;
      });
  }
});

// i should be able to edit the title and body of a note when i click
// on it and it should save when i click on the button.

noteDetail.addEventListener("click", function (event) {
  if (event.target.id === "save") {
    const noteId = event.target.dataset.id;
    const editTitleInput = document.querySelector(`h1[data-id="${noteId}"]`);
    const editBodyInput = document.querySelector(`p[data-id="${noteId}"]`);
    const singleNote = document.querySelector(`a[data-id="${noteId}"]`);
    fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        title: editTitleInput.innerText,
        body: editBodyInput.innerText,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (note) {
        singleNote.innerText = editTitleInput.innerText;
      });
  }
});

// when i click on the button, a form with a title and body input
// should display on the right.

const newNoteButton = document.querySelector("#create");

newNoteButton.addEventListener("click", function (event) {
  fetch("http://localhost:3000/api/v1/notes")
    .then(function (response) {
      return response.json();
    })
    .then(function (note) {
      noteDetail.innerHTML = `<input id="title" class="input subtitle is-5" type="text" placeholder="Title">
            <textarea id="body" class="textarea subtitle is-5" placeholder="Body" rows="10"></textarea><a id="add" class="button has-text-black" style="margin-left: 594px;">Add Note</a>`;

      // when i click on 'add button', a new note with a title and body
      // should be created and added to the list of notes.

      const noteTitleInput = document.querySelector("#title");
      const noteBodyInput = document.querySelector("#body");
      const addNoteButton = document.querySelector("#add");

      addNoteButton.addEventListener("click", function (event) {
        // event.preventDefault()
        fetch("http://localhost:3000/api/v1/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
          },
          body: JSON.stringify({
            title: noteTitleInput.value,
            body: noteBodyInput.value,
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (note) {
            noteList.innerHTML += `<li data-id=${note.id}><a id="note" data-id=${note.id} class="menu-item">${note.title}</a><i id="delete" class="fas fa-minus-circle has-text-grey-light hvr-grow"></i></li>`;
          });
      });
    });
});

// i should be able to delete a note when i click on the button.

noteList.addEventListener("click", function (event) {
  // event.preventDefault()
  if (event.target.id === "delete") {
    const noteId = event.target.dataset.id;
    // const noteListItem = document.querySelector("#list-item")
    const noteListItem = document.querySelector(`li[data-id="${noteId}"]`);
    const singleNote = document.querySelector(`a[data-id="${noteId}"]`);
    fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
      method: "DELETE",
    });
    // debugger
    // lastNote = noteList.lastElementChild
    // noteList.removeChild(lastNote)
    // singleNote.parentElement.remove()
    noteListItem.parentNode.removeChild(noteListItem);
    noteDetail.innerHTML = "";
  }
});
