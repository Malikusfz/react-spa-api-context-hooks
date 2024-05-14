// Import necessary libraries and components
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';

// Import components and contexts
import ButtonAction from '../components/common/Button';
import NoteDetail from '../components/notes/NoteDetails';
import Loading from '../components/common/Loading';
import LocaleContext from '../contexts/LocaleContext';

// Import network data utility
import { getNote, deleteNote } from '../utils/network-data';

// Custom hook for fetching note details
function useNoteDetails(noteId) {
  const [note, setNote] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getNote(noteId).then(({ data }) => {
      setNote(data);
      setLoading(false);
    });
  }, [noteId]);

  return { note, loading };
}

function useDeleteNote() {
  const navigate = useNavigate();

  async function deleteNotenHandler(noteId, archived) {
    await deleteNote(noteId);
    // Setelah menghapus catatan, arahkan kembali ke halaman utama
    navigate('/');
  }
  return deleteNotenHandler;
}

// Define the DetailPage component
function DetailPage() {
  // Get the function to select the language from the LocaleContext
  const { selectLanguage } = React.useContext(LocaleContext);
  const navigate = useNavigate();
  // Get the id from the URL parameters
  const { id } = useParams();

  // Use custom hooks
  const { note, loading } = useNoteDetails(id);
  const deleteNotenHandler = useDeleteNote();

  // Define a function to handle the back button click
  function onBackButtonHandler() {
    navigate('/');
  }

  // Return the Loading component if loading is true
  if (loading) {
    return <Loading />;
  }

  // Return a message if the note is null
  if (note === null) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
          {selectLanguage({ id: `Note dengan ID "${id}" tidak tersedia.`, en: `Note with ID "${id}" not available.` })}
        </h1>
        <button onClick={onBackButtonHandler} style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
          {selectLanguage({ id: 'Kembali ke Beranda', en: 'Back to Home' })}
        </button>
      </div>
    );
  }

  // Render the detail page
  return (
    <section>
      <div className='details-page__content'>
        <NoteDetail {...note} />
      </div>
      <div className='details-page-actions'>
        <ButtonAction
          title={selectLanguage({ id: 'Hapus', en: 'Delete' })}
          onClick={() => deleteNotenHandler(id, note.archived)}
          icon={<FiTrash2 />}
        />
      </div>
      <div style={{ position: 'fixed', bottom: '35px', left: '35px' }}>
        <ButtonAction
          title={selectLanguage({ id: 'Kembali', en: 'Back' })}
          onClick={onBackButtonHandler}
          icon={<FiArrowLeft />}
        />
      </div>
    </section>
  );
}

// Export the DetailPage component
export default DetailPage;
