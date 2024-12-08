import "../styles/Note.css"

const Note = ({note, onDelete}) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US')
  return (
    <div className='note-container'>
        <p className='note-title'>
            {note.title}
        </p>
        <p className='note-content'>
            {note.content}
        </p>
        <p className='note-date'>
            {formattedDate}
        </p>
        <button onClick={() => onDelete(note.id)} className='delete-button'>
            Delete
        </button>
    </div>
  )
}

export default Note