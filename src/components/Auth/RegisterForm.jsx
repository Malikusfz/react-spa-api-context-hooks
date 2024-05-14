import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import useInput from '../../hooks/useInput';
import LocaleContext from '../../contexts/LocaleContext';

function RegisterForm({ register }) {
  const { selectLanguage } = useContext(LocaleContext);

  const initialState = { error: '', name: '', email: '', password: '', confirmPassword: '' };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'SET_CONFIRM_PASSWORD':
        return { ...state, confirmPassword: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, name, email, password, confirmPassword } = state;

  const onNameChange = (event) => dispatch({ type: 'SET_NAME', payload: event.target.value });
  const onEmailChange = (event) => dispatch({ type: 'SET_EMAIL', payload: event.target.value });
  const onPasswordChange = (event) => dispatch({ type: 'SET_PASSWORD', payload: event.target.value });
  const onConfirmPasswordChange = (event) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: event.target.value });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      dispatch({
        type: 'SET_ERROR',
        payload: selectLanguage({
          id: 'Password dan konfirmasi password harus sama.',
          en: 'Password and confirmation password must same.'
        })
      });
    } else {
      dispatch({ type: 'SET_ERROR', payload: '' });
      register({ name, email, password });
    }
  };

  return (
    <div className='form-register'>
      <form onSubmit={onSubmitHandler}>
        {error && <p className='error-message'>{error}</p>}
        <label htmlFor='name'>{selectLanguage({ id: 'Nama', en: 'Name' })}</label>
        <input type='text' id='name' value={name} onChange={onNameChange} />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' value={email} onChange={onEmailChange} autoComplete='new-email' />
        <label htmlFor='password'>{selectLanguage({ id: 'Kata Sandi', en: 'Password' })}</label>
        <input type='password' id='password' value={password} onChange={onPasswordChange} autoComplete='new-password' />
        <label htmlFor='confirmPassword'>
          {selectLanguage({ id: 'Konfirmasi Kata Sandi', en: 'Confirm Password' })}
        </label>
        <input
          type='password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          autoComplete='new-confirm-password'
        />
        <button type='submit'>{selectLanguage({ id: 'Daftar', en: 'Register' })}</button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired
};

export default RegisterForm;
