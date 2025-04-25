import React from "react";
import axios from "axios";

function NoteList({ notes, refreshNotes, setEditingNote }) {
    const deleteNote = id => {
        axios.delete(`http://localhost:8000/api/notes/${id}/`)
            .then(() => refreshNotes());
    };

    return (
        <div>
            {notes.map(note => (
                <div key={note.id} className="note" style={{ border: '1px solid gray', padding: '1rem', margin: '0.5rem 0' }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={() => deleteNote(note.id)}>Delete</button>
                    <button onClick={() => setEditingNote(note)}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default NoteList;