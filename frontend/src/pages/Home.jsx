import { useEffect, useState } from 'react'
import api from '../api'

const Home = () => {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = async () => {
    try {
      const res = await api.get('/api/notes/');
      setNotes(res.data);
      console.log(res.data);
    } catch (err) {
      alert('Error fetching notes:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        alert('Note deleted successfully');
        getNotes(); 
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert('Error deleting note:', err);
    }
  };


  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/notes/', { content, title });
      if (res.status === 201) {
        alert('Note created successfully');
        setContent(''); 
        setTitle('');
        getNotes(); 
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert('Error creating note:', err);
    }
  };



  return (
    <>
      <div>
        <h2>Notes</h2>
      </div>
      
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title:</label>
        <br />
        <input
          type='text'
          id='title'
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor='content'>Content:</label>
        <br />
        <textarea
          id='content'
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />

        <button type='submit'>Create Note</button>
      </form>
    </>
  )
}

export default Home