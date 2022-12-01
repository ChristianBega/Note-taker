let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === "/notes") {
  noteTitle = document.querySelector(".note-title");
  noteText = document.querySelector(".note-textarea");
  saveNoteBtn = document.querySelector(".save-note");
  newNoteBtn = document.querySelector(".new-note");
  noteList = document.querySelectorAll(".list-container .list-group");
}

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




// Fetch : GET METHOD - getNotes
const getNotes = () =>
  //http://localhost:3001/api/notes
  fetch("/api/notes", {
    method: "GET",
    headers: {
      // headers????
      "Content-Type": "application/json",
    },
  });

// Fetch : POST METHOD - saveNotes
const saveNote = (note) =>
  //http://localhost:3001/api/notes
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

// Fetch : DELETE METHOD - deleteNotes
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });



  
// Render Active notes function
const renderActiveNote = () => {
  hide(saveNoteBtn);
  // if activeNote.id === true RUN code
  if (activeNote.id) {
    //setting attributes to active note to readonly || TRUE
    noteTitle.setAttribute("readonly", true);
    noteText.setAttribute("readonly", true);
    //setting values
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    //setting attributes to active note to readonly || FALSE
    noteTitle.removeAttribute("readonly");
    noteText.removeAttribute("readonly");
    //setting values to empty
    noteTitle.value = "";
    noteText.value = "";
  }
};

// Handle note save function
const handleNoteSave = () => {
  // creating newNote object, that will store the new notes key/value pairs
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  // Calling save note function; waiting for promise object to be fulfilled
  saveNote(newNote).then(() => {
    // Once fulfilled then call getAndRenderNotes && renderActiveNote functions
    getAndRenderNotes();
    renderActiveNote();
  });
};
// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  // Creating var to store the e.target
  const note = e.target;
  // Creating a var to store the JSON object (note being clicked on)
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  // if there is an ID that matches del that note.
  if (activeNote.id === noteId) {
    activeNote = {};
  }

  // Calling deleteNote function, passing it noteId (note being clicked on)
  deleteNote(noteId).then(() => {
    // calling getAndRenderNotes
    getAndRenderNotes();
    // calling renderActiveNotes
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === "/notes") {
    noteList.forEach((el) => (el.innerHTML = ""));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.classList.add("list-item-title");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement("i");
      delBtnEl.classList.add("fas", "fa-trash-alt", "float-right", "text-danger", "delete-note");
      delBtnEl.addEventListener("click", handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi("No saved Notes", false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === "/notes") {
  saveNoteBtn.addEventListener("click", handleNoteSave);
  newNoteBtn.addEventListener("click", handleNewNoteView);
  noteTitle.addEventListener("keyup", handleRenderSaveBtn);
  noteText.addEventListener("keyup", handleRenderSaveBtn);
}

getAndRenderNotes();
