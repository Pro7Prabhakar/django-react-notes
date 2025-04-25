import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NoteForm({ refreshNotes, editingNote, setEditingNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        }
    }, [editingNote]);

    const handleSubmit = e => {
        e.preventDefault();
        const data = { title, content };

        if(editingNote) {
            axios.put(`http://localhost:8000/api/notes/${editingNote.id}/`, data)
            .then(() => {
                refreshNotes();
                setTitle('');
                setContent('');
                setEditingNote(null);
            });
        } else {
            axios.post('http://localhost:8000/api/notes/', data)
                .then(() => {
                    refreshNotes();
                    setTitle('');
                    setContent('');
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea placeholder='Content' value={content} onChange={e => setContent(e.target.value)} required />
            <button type='submit'>{editingNote ? "Update" : "Add"} Note</button>
            {editingNote && <button onClick={() => setEditingNote(null)}>Cancel</button>}
        </form>
    );
}

export default NoteForm;