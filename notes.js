
//Añade una nota si no está vacía, la guarda en el 
//almacenamiento local y devuelve la nota añadida. 
//Si la nota está vacía, devuelve null.

export function addNote(noteText) { 
    const nota = {texto:noteText.trim(),fecha: new Date().toString()} 
    if (noteText.trim() !== '') {
        saveNoteToLocalStorage(nota);
        return nota
    }
    return null;
}
//new Date().toString().
//Elimina una nota del almacenamiento local.
export function deleteNoteElement(noteText) {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

//Carga las notas desde el almacenamiento local y las devuelve como un array.
export function loadNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}
//Guarda una nota en el almacenamiento local.
function saveNoteToLocalStorage(nota) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(nota);
    localStorage.setItem('notes', JSON.stringify(notes));
}