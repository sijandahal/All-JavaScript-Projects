const noteValue = document.querySelector(".notes__value");
const formSubmit = document.querySelector(".form__submit");
const outputDisplay = document.querySelector(".notes__output");
const searchInput = document.querySelector(".search__value");
let notes = [];

function updateNotesDisplay(filteredNotes) {
  outputDisplay.innerHTML = "";
  filteredNotes.forEach((note) => {
    console.log(note);
    outputDisplay.innerHTML += `
     <h1>${note}</h1>
    `;
  });
}

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  let noteValueDisplay = noteValue.value;
  if (noteValueDisplay == "") return;
  notes.push(noteValueDisplay);
  updateNotesDisplay(notes);

  console.log(notes);
});

console.log(notes);

searchInput.addEventListener("input", (e) => {
  let searchInputValue = e.target.value;
  console.log(searchInputValue);
  const filteredNotes = notes.filter((note) => {
    return note.toLowerCase().includes(searchInputValue);
  });
  updateNotesDisplay(filteredNotes);
});
