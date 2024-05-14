import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

const NotFoundPage = () => {
  const { selectLanguage } = useContext(LocaleContext);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  return (
    <section style={style}>
      <h2>404</h2>
      <p>{selectLanguage({ id: 'Halaman tidak ditemukan.', en: 'Page not found.' })}</p>
    </section>
  );
};

export default NotFoundPage;
