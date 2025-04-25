import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import './App.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = () => {
    axios.get('http://localhost:8000/api/notes/')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{padding: '2rem' }}>
      <h1>📝 Notes Manager</h1>
      <NoteForm refreshNotes={fetchNotes}
      editingNote={editingNote}
      setEditingNote={setEditingNote} />
      <NoteList notes={notes} 
      refreshNotes={fetchNotes}
      setEditingNote={setEditingNote} />
    </div>
  );
}

export default App;
