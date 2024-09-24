// index.test.js
import { addNote, deleteNoteElement, loadNotes } from '../notes.js';

describe('addNote', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should add a note to localStorage', () => {
        const noteText = 'Test Note';
        addNote(noteText);
        const notes = loadNotes();
        expect(notes).toContain(noteText);
    });

    test('should return trimmed note text', () => {
        const noteText = '  Test Note  ';
        const result = addNote(noteText);
        expect(result).toBe('Test Note');
    });

    test('should return null for empty or whitespace-only note', () => {
        expect(addNote('')).toBeNull();
        expect(addNote('   ')).toBeNull();
    });
});

describe('deleteNoteElement', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should delete a note from localStorage', () => {
        const noteText = 'Test Note';
        addNote(noteText);
        deleteNoteElement(noteText);
        const notes = loadNotes();
        expect(notes).not.toContain(noteText);
    });
});