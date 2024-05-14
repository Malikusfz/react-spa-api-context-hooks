import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

// Import LocaleContext
import LocaleContext from '../../contexts/LocaleContext';

// Define the SearchBar component with optimization
function SearchBar({ keyword, keywordChange }) {
  // Get the function to select the language from the LocaleContext
  const { selectLanguage } = useContext(LocaleContext);

  // Use useCallback to memoize the onChange handler
  const handleKeywordChange = useCallback(
    (event) => {
      keywordChange(event.target.value);
    },
    [keywordChange]
  );

  // Render the search bar
  return (
    <section className='bar-search'>
      <input
        type='text'
        placeholder={selectLanguage({ id: 'Cari catatan', en: 'Search notes' })}
        value={keyword}
        onChange={handleKeywordChange}
      />
    </section>
  );
}

// Define the prop types for the SearchBar component
SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
};

// Export the SearchBar component
export default SearchBar;
