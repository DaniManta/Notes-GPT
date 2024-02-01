document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
        const notesContainer = document.getElementById('notes-container');
        const timestamp = new Date().getTime();
        const noteObject = { id: timestamp, text: noteText };

        // Save note to localStorage
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(noteObject);
        localStorage.setItem('notes', JSON.stringify(existingNotes));

        // Update UI
        loadNotes();

        // Clear input
        noteInput.value = '';
    }
}

function loadNotes() {
    const notesContainer = document.getElementById('notes-container');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notesContainer.innerHTML = '';

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note.text}</p>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    loadNotes();
}
