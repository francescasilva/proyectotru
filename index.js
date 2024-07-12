// index.js (modificado para exportar funciones)

export function addNote(noteText) {
    if (noteText.trim() !== '') {
        saveNoteToLocalStorage(noteText.trim());
        return noteText.trim();
    }
    return null;
}

export function deleteNoteElement(noteText) {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

export function loadNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNoteToLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const noteInput = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');

    loadInitialNotes();

    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const noteText = noteInput.value.trim();
        const newNote = addNote(noteText);
        if (newNote) {
            const noteElement = createNoteElement(newNote);
            notesContainer.appendChild(noteElement);
            noteInput.value = '';
            noteInput.focus();
        }
    });

    function loadInitialNotes() {
        const notes = loadNotes();
        notes.forEach(noteText => {
            const noteElement = createNoteElement(noteText);
            notesContainer.appendChild(noteElement);
        });
    }

    function createNoteElement(noteText) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';

        const noteContent = document.createElement('div');
        noteContent.className = 'note-content';
        noteContent.innerText = noteText;
        noteElement.appendChild(noteContent);

        const pinButton = document.createElement('button');
        pinButton.className = 'pin-btn';
        pinButton.innerHTML = '<i class="fas fa-thumbtack"></i>';
        pinButton.addEventListener('click', function() {
            pinNoteElement(noteElement, noteText);
        });
        noteElement.appendChild(pinButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', function() {
            noteElement.remove();
            deleteNoteElement(noteText);
        });
        noteElement.appendChild(deleteButton);

        return noteElement;
    }

    function pinNoteElement(noteElement, noteText) {
        notesContainer.prepend(noteElement);
        const notes = loadNotes();
        const updatedNotes = notes.filter(note => note !== noteText);
        updatedNotes.unshift(noteText);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
});