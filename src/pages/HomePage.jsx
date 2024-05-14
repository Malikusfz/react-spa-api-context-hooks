// Menggunakan React hooks untuk state dan side effects
import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaNotesMedical } from 'react-icons/fa6';

// Komponen dan konteks
import NoteListShow from '../components/notes/NoteListShow';
import SearchBar from '../components/common/SearchBar';
import ButtonAction from '../components/common/Button';
import Loading from '../components/common/Loading';
import LocaleContext from '../contexts/LocaleContext';

// Utilitas data jaringan
import { getActiveNotes } from '../utils/network-data';

const HomePage = () => {
  const { selectLanguage } = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await getActiveNotes();
        const truncatedNotes = data.map((note) => ({
          ...note,
          body: note.body.length > 18 ? `${note.body.substring(0, 18)}...` : note.body
        }));
        setNotes(truncatedNotes);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const onAddButtonHandler = () => navigate('/notes/new');
  const onKeywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const filteredNotes = notes.filter(({ title }) => title.toLowerCase().includes(keyword.toLowerCase()));

  if (loading) return <Loading />;

  return (
    <section className='homepage'>
      <h2>{selectLanguage({ id: 'Catatan', en: 'Active Note' })}</h2>
      <div className='home-actions'>
        <ButtonAction
          title={selectLanguage({ id: 'Tambah', en: 'Add' })}
          onClick={onAddButtonHandler}
          icon={<FaNotesMedical />}
        />
      </div>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteListShow notes={filteredNotes} />
    </section>
  );
};

export default HomePage;
