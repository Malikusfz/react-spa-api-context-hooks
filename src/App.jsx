// Import necessary libraries and components
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import NewNotePage from './pages/NewNotePage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

// Import contexts
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';

// Import network data utilities
import { getUserLogged, putAccessToken } from './utils/network-data';

// Define the main App component
function App() {
  // Initialize state variables
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(localStorage.getItem('locale') || 'id');
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

  // Define function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Define theme context value
  const themeContextValue = { theme, toggleTheme };

  // Use effect hook to set theme attribute
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Define function to toggle locale
  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  // Define function to select language
  const selectLanguage = ({ id, en }) => {
    return locale === 'id' ? id : en;
  };

  // Define locale context value
  const localeContextValue = { locale, toggleLocale, selectLanguage };

  // Define function to handle login success
  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);
  // Define function to handle logout
  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  // Return null if initializing
  if (initializing) {
    return null;
  }
  // Render the app
  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className='app-container'>
          {authedUser && (
            <header>
              <Navbar logout={onLogout} name={authedUser.name} toggleTheme={toggleTheme} />
            </header>
          )}
          <main>
            <Routes>
              {authedUser ? (
                <>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/notes/new' element={<NewNotePage />} />
                  <Route path='/notes/:id' element={<DetailPage />} />
                  <Route path='*' element={<NotFoundPage />} />
                </>
              ) : (
                <>
                  <Route path='/*' element={<LoginPage loginSuccess={onLoginSuccess} />} />
                  <Route path='/register' element={<RegisterPage />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

// Export the App component
export default App;
