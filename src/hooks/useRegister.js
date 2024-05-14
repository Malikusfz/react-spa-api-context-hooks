// Di dalam file hooks/useRegister.js
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';

export function useRegister() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);

    if (!error) {
      alert('User created');
      navigate('/');
    }
  }

  return onRegisterHandler;
}
