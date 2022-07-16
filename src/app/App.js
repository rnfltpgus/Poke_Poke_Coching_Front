import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../components/header/Header';
import Main from '../pages/Main';
import Login from '../pages/Login';
import StudyPage from '../pages/StudyPage';
import StretchingPage from '../pages/StretchingPage';
import NotFoundPage from '../pages/NotFoundPage';

import GlobalStyles from './GlobalStyles';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('name');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />} />
        <Route path='/studypage' element={<StudyPage />} />
        <Route path='/stretchingpage' element={<StretchingPage />} />
        <Route path='*' element={<NotFoundPage replace />} />
      </Routes>
    </>
  );
};

export default App;
