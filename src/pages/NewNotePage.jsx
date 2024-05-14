import React, { useReducer } from 'react';
import NoteForm from '../components/notes/NoteForm';
import Button from '../components/common/Button';
import LocaleContext from '../contexts/LocaleContext';
import { addNote } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowLeft } from 'react-icons/fi'; // Import FiArrowLeft

// Define the initial state for the note
const initialState = {
  title: '',
  body: ''
};

// Define the reducer function to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_BODY':
      return { ...state, body: action.payload };
    default:
      return state;
  }
}

function NewNotePage() {
  const { selectLanguage } = React.useContext(LocaleContext);
  const navigate = useNavigate();

  // Use the useReducer hook to manage note state
  const [newNote, dispatch] = useReducer(reducer, initialState);

  // Update the title in the state
  function onTitleChangeEventHandler(event) {
    dispatch({ type: 'SET_TITLE', payload: event.target.value });
  }

  // Update the body in the state
  function onBodyInputEventHandler(event) {
    dispatch({ type: 'SET_BODY', payload: event.target.innerHTML });
  }

  // Save the note and navigate back to the home page
  async function onSaveNoteHandler() {
    await addNote(newNote);
    navigate('/');
  }

  // Handler for the back button
  function onBackButtonHandler() {
    navigate('/');
  }

  return (
    <section className='add-new-page'>
      {/* Add the back button */}

      <NoteForm state={newNote} onTitleChange={onTitleChangeEventHandler} onBodyInput={onBodyInputEventHandler} />
      <div className='new-page-actions'>
        {/* Tambahkan tombol kembali di sini */}
        <Button
          title={selectLanguage({ id: 'Kembali', en: 'Back' })}
          onClick={onBackButtonHandler}
          icon={<FiArrowLeft />}
          style={{ position: 'absolute', bottom: '20px', left: '20px' }}
        />
        <Button title={selectLanguage({ id: 'Simpan', en: 'Save' })} onClick={onSaveNoteHandler} icon={<FiCheck />} />
      </div>
    </section>
  );
}

export default NewNotePage;
