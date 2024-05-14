// Di dalam file RegisterPage.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LuLightbulbOff, LuLightbulb } from 'react-icons/lu';
import { BsTranslate } from 'react-icons/bs';
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';
import RegisterInput from '../components/Auth/RegisterForm';
import { useRegister } from '../hooks/useRegister'; // Import custom hook

function RegisterPage() {
  const { selectLanguage } = useContext(LocaleContext);
  const onRegisterHandler = useRegister(); // Gunakan custom hook

  // State management untuk theme dan locale
  const [theme, setTheme] = useState('light');
  const [locale, setLocale] = useState('id');

  // Handlers untuk toggle theme dan locale
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLocale = () => setLocale(locale === 'id' ? 'en' : 'id');

  return (
    <section className='register-page'>
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
          <h2>{selectLanguage({ id: 'Daftar', en: 'Register' })}</h2>
          <RegisterInput register={onRegisterHandler} />

          <p>
            {selectLanguage({ id: 'Sudah memilikiakun', en: 'Already have an account' })}{' '}
            <Link to='/'>{selectLanguage({ id: 'Login!', en: 'Login !' })}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
