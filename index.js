document.addEventListener('DOMContentLoaded', (event) => {
    const noteForm = document.getElementById('noteForm');
    const noteInput = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');

    // Cargar notas guardadas al iniciar
    loadNotes();

    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNote();
    });

    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const noteElement = createNoteElement(noteText);
            notesContainer.appendChild(noteElement);
            saveNoteToLocalStorage(noteText);
            noteInput.value = '';
            noteInput.focus();
        }
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
            pinNote(noteElement, noteText);
        });
        noteElement.appendChild(pinButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', function() {
            noteElement.remove();
            deleteNoteFromLocalStorage(noteText);
        });
        noteElement.appendChild(deleteButton);

        return noteElement;
    }

    function pinNote(noteElement, noteText) {
        notesContainer.prepend(noteElement);
        let notes = localStorage.getItem('notes');
        if (notes) {
            notes = JSON.parse(notes);
            notes = notes.filter(note => note !== noteText);
            notes.unshift(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }

    function saveNoteToLocalStorage(noteText) {
        let notes = localStorage.getItem('notes');
        if (notes) {
            notes = JSON.parse(notes);
        } else {
            notes = [];
        }
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        let notes = localStorage.getItem('notes');
        if (notes) {
            notes = JSON.parse(notes);
            notes.forEach(noteText => {
                const noteElement = createNoteElement(noteText);
                notesContainer.appendChild(noteElement);
            });
        }
    }

    function deleteNoteFromLocalStorage(noteText) {
        let notes = localStorage.getItem('notes');
        if (notes) {
            notes = JSON.parse(notes);
            notes = notes.filter(note => note !== noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }
});