import React from 'react';
import PropTypes from 'prop-types';

// Import LocaleContext
import LocaleContext from '../../contexts/LocaleContext';

// Define the NoteDetails component
function NoteDetails({ title, body, createdAt }) {
  // Get the function to select the language from the LocaleContext
  const { selectLanguage } = React.useContext(LocaleContext);

  // Define a function to format the date
  const showFormattedDate = (date, type) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString(type, options);
  };

  // Render the note detail
  return (
    <>
      <h3 className='details-title'>{title}</h3>
      <p className='details-date'>
        {/* Show the creation date in the selected language */}
        {selectLanguage({ id: showFormattedDate(createdAt, 'id-ID'), en: showFormattedDate(createdAt, 'en-US') })}
      </p>
      {/* Render the body HTML string using dangerouslySetInnerHTML */}
      <div className='details-content' dangerouslySetInnerHTML={{ __html: body }}></div>
    </>
  );
}

// Define the prop types for the NoteDetails component
NoteDetails.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

// Export the NoteDetails component
export default NoteDetails;
