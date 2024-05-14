import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LuLightbulbOff, LuLightbulb } from 'react-icons/lu';
import { BsTranslate } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { TbNotes } from 'react-icons/tb';

import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

function NavBar({ logout, name }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { toggleLocale, selectLanguage } = React.useContext(LocaleContext);

  useEffect(() => {
    // Logika untuk mengatur tema bisa ditambahkan di sini
  }, [theme]);

  useEffect(() => {
    // Logika untuk mengatur lokal bisa ditambahkan di sini
  }, [toggleLocale]);

  return (
    <>
      <h1>
        <Link to='/'>
          {selectLanguage({ id: 'Catatan Ku', en: 'My Notes' })}
          <TbNotes />
        </Link>
      </h1>
      {logout && <nav className='NavBar'></nav>}
      <button className='locale-toggle' onClick={toggleLocale}>
        <BsTranslate />
      </button>
      <button className='theme-toggle' onClick={toggleTheme}>
        {theme === 'light' ? <LuLightbulb /> : <LuLightbulbOff />}
      </button>
      {logout && (
        <button className='logout-button' onClick={logout} title='Logout'>
          {name} <HiOutlineLogout />
        </button>
      )}
    </>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string
};

export default NavBar;
