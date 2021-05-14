import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'
import { entries as Entries } from 'idb-keyval';
import { del } from 'idb-keyval';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    const entries = await Entries();

    const notes = entries.filter(note => note[0].startsWith('note_'));

    return notes.map(note => (note[1]));
  }

  useEffect(async() => {
    const fetchedNotes = await getAllNotes();
    setNotes(fetchedNotes);
  });

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard
              note={note} 
              handleDelete={(id) => del(`note_${id}`)} 
            />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}