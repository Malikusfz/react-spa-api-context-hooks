import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../../contexts/LocaleContext';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../common/Button';

function NoteInput({ state, onTitleChange, onBodyInput, onBackButtonHandler }) {
  const { selectLanguage } = useContext(LocaleContext);

  const titlePlaceholder = selectLanguage({ id: 'Catatan', en: 'Note' });
  const bodyPlaceholder = selectLanguage({ id: 'Cerita sini', en: 'Tell me the story' });

  return (
    <>
      <div className='new-page-input'>
        <input
          type='text'
          className='input-title-new-page'
          placeholder={titlePlaceholder}
          value={state.title}
          onChange={onTitleChange}
          spellCheck='false'
          required
        />
        <div
          className='input-body-new-page'
          contentEditable='true'
          data-placeholder={bodyPlaceholder}
          onInput={onBodyInput}
          spellCheck='false'
          suppressContentEditableWarning={true}
          role='textbox'
          aria-required='true'
        ></div>
      </div>
    </>
  );
}

NoteInput.propTypes = {
  state: PropTypes.object.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyInput: PropTypes.func.isRequired,
  onBackButtonHandler: PropTypes.func.isRequired
};

export default NoteInput;
