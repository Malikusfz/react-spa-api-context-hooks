import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import ThemeContext from '../../contexts/ThemeContext';

function Loading() {
  const { theme } = React.useContext(ThemeContext);
  const [loaderColor, setLoaderColor] = useState('#000');

  useEffect(() => {
    // Mengatur warna BeatLoader berdasarkan tema yang aktif
    const color = theme === 'light' ? '#000' : '#fff';
    setLoaderColor(color);
  }, [theme]); // Efek ini akan dipicu ulang hanya ketika tema berubah

  return (
    <div className='animation-loader'>
      <BeatLoader color={loaderColor} />
    </div>
  );
}

export default Loading;
