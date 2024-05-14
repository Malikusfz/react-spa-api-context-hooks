// Import necessary libraries and components
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LuLightbulbOff, LuLightbulb } from 'react-icons/lu';
import { BsTranslate } from 'react-icons/bs';

// Import components and contexts
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';
import LoginForm from '../components/Auth/LoginForm';

// Import network data utility
import { login } from '../utils/network-data';

// Custom hook for login logic
function useLogin(loginSuccess) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  };

  return { theme, toggleTheme, onLogin };
}

// Define the LoginPage component
function LoginPage({ loginSuccess }) {
  const { theme, toggleTheme, onLogin } = useLogin(loginSuccess);
  const { toggleLocale, selectLanguage } = React.useContext(LocaleContext);

  // Render the login page
  return (
    <section className='login-page'>
      <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className='locale-toggle' onClick={toggleLocale}>
          <BsTranslate />
        </button>
        <button className='theme-toggle' onClick={toggleTheme}>
          {theme === 'light' ? <LuLightbulb /> : <LuLightbulbOff />}
        </button>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 50px)' }}>
        <div
          style={{
            width: '80%',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            padding: '20px',
            borderRadius: '10px',
            color: theme === 'light' ? '#000' : '#fff',
            border: theme === 'light' ? '1px solid #000' : '1px solid #fff'
          }}
        >
          <h2>{selectLanguage({ id: 'Login', en: 'Login' })}</h2>
          <LoginForm login={onLogin} />

          <p>
            {selectLanguage({ id: 'Belum punya akun?', en: "Don't have an account?" })}{' '}
            <Link to='/register'>{selectLanguage({ id: 'Daftar di sini', en: 'Register here' })}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// Define the prop types for the LoginPage component
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired
};

// Export the LoginPage component
export default LoginPage;
