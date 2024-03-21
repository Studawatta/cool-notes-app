import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Note } from './models/note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchData();
  }, []);
  return <div className="App">{JSON.stringify(notes)}</div>;
}

export default App;
