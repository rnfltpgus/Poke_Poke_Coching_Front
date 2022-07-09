import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Main from '../pages/Main';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import StudyPage from '../pages/StudyPage';
import StretchingPage from '../pages/StretchingPage';

import GlobalStyles from './GlobalStyles';

const App = () => {
  const navigator = useNavigate();
  const isLoggedIn = localStorage.getItem('name');

  useEffect(() => {
    if (!isLoggedIn) {
      navigator('/login');
    }
  }, [isLoggedIn]);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/studypage' element={<StudyPage />} />
        <Route path='/stretchingpage' element={<StretchingPage />} />
      </Routes>
    </>
  );
};

export default App;
