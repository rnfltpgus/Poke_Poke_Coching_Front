import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Main from '../pages/Main';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import StudyMode from '../pages/StudyMode';
import StretchingMode from '../pages/StretchingMode';

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
        <Route path='/studymode' element={<StudyMode />} />
        <Route path='/stretchingmode' element={<StretchingMode />} />
      </Routes>
    </>
  );
};

export default App;
