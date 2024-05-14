import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import useInput from '../../hooks/useInput';
import LocaleContext from '../../contexts/LocaleContext';

function LoginForm({ login }) {
  const { selectLanguage } = useContext(LocaleContext);

  const initialState = { error: '', email: '', password: '' };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, email, password } = state;

  const onEmailChange = (event) => dispatch({ type: 'SET_EMAIL', payload: event.target.value });
  const onPasswordChange = (event) => dispatch({ type: 'SET_PASSWORD', payload: event.target.value });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!email || !password) {
      dispatch({
        type: 'SET_ERROR',
        payload: selectLanguage({ id: 'Email dan Kata Sandi harus diisi.', en: 'Email and Password are required.' })
      });
      return;
    }
    dispatch({ type: 'SET_ERROR', payload: '' });
    login({ email, password });
  };

  return (
    <div className='form-login'>
      <form onSubmit={onSubmitHandler}>
        {error && <p className='error-message'>{error}</p>}
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' value={email} onChange={onEmailChange} autoComplete='new-email' />
        <label htmlFor='password'>{selectLanguage({ id: 'Kata Sandi', en: 'Password' })}</label>
        <input type='password' id='password' value={password} onChange={onPasswordChange} autoComplete='new-password' />
        <button type='submit'>{selectLanguage({ id: 'Masuk', en: 'Login' })}</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginForm;
