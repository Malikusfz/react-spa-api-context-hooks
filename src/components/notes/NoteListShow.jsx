import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './Note';
import LocaleContext from '../../contexts/LocaleContext';

function NoteListShow({ notes }) {
  const { selectLanguage } = React.useContext(LocaleContext);

  // Menggunakan useMemo untuk menghindari pemotongan judul yang tidak perlu pada re-render
  const truncatedTitles = React.useMemo(() => {
    return notes.map((note) => ({
      ...note,
      title: note.title.length > 18 ? note.title.substring(0, 18) + '...' : note.title
    }));
  }, [notes]);

  return (
    <div>
      {truncatedTitles.length > 0 ? (
        <section className='list-notes'>
          {truncatedTitles.map(({ id, title, body, createdAt }) => (
            <NoteItem key={id} id={id} title={title} body={body} createdAt={createdAt} />
          ))}
        </section>
      ) : (
        <section className='empty-notes-list'>
          <p className='empty_notes-list'>
            {selectLanguage({ id: 'Tidak ada catatan yang tersedia.', en: 'No notes available.' })}
          </p>
        </section>
      )}
    </div>
  );
}

NoteListShow.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default React.memo(NoteListShow);
