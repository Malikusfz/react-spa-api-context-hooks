import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import LocaleContext
import LocaleContext from '../../contexts/LocaleContext';

// Define the Note component with optimization
const Note = React.memo(({ id, title, body, createdAt }) => {
  // Get the function to select the language from the LocaleContext
  const { selectLanguage } = useContext(LocaleContext);

  // Memoize the formatted date to prevent unnecessary calculations
  const formattedDate = useMemo(() => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(createdAt).toLocaleDateString(selectLanguage.type, options);
  }, [createdAt, selectLanguage.type]);

  // Render the note item
  return (
    <article className='single-note'>
      <h3 className='note-title'>
        {/* Link to the note detail page */}
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className='note-date'>
        {/* Show the creation date in the selected language */}
        {formattedDate}
      </p>
      {/* Render the body HTML string using dangerouslySetInnerHTML */}
      <div className='note-content' dangerouslySetInnerHTML={{ __html: body }}></div>
    </article>
  );
});

// Define the prop types for the Note component
Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

// Export the Note component
export default Note;
