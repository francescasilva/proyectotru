
import { addNote, deleteNoteElement, loadNotes } from './notes.js';

//Este código se ejecuta cuando el contenido del DOM se ha cargado completamente.
document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const noteInput = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');

    //Carga las notas iniciales desde el almacenamiento local y las añade al contenedor de notas.
    loadInitialNotes();

     // Cargar las notas guardadas al cargar la página
     // Añade un evento submit al formulario para manejar la creación de nuevas notas.
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
    

    // Cargar las notas guardadas EN EL LOCAL STORAGE
    function loadInitialNotes() {
        const notes = loadNotes();
        notes.forEach(noteText => {
            const noteElement = createNoteElement(noteText);
            notesContainer.appendChild(noteElement);
        });
    }
     
    
    function createNoteElement(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';

        const noteContent = document.createElement('div');
        noteContent.className = 'note-content';
            noteContent.innerText = note.texto;
            noteElement.appendChild(noteContent);
         
        const noteFecha = document.createElement('div');
        noteFecha.innerText= note.fecha
       noteElement.appendChild(noteFecha);


        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            const newText = prompt('Edita tu nota:', noteText);
            if (newText !== null) {
                noteContent.innerText = newText.trim();
                updateNoteInLocalStorage(noteText, newText.trim());
            }
        });
        noteElement.appendChild(editButton);


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

    function updateNoteInLocalStorage(oldText, newText) {
        const notes = loadNotes();
        const noteIndex = notes.indexOf(oldText);
        if (noteIndex !== -1) {
            notes[noteIndex] = newText;
        }
        localStorage.setItem('notes', JSON.stringify(notes));
    }
});



