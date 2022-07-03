import { Routes, Route } from 'react-router-dom';

import Header from '../components/header';
import GlobalStyles from './GlobalStyles';
import Login from '../pages/Login';
import Main from '../pages/Main';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/' element={<Main />} />
        <Route path='/' element={<Main />} />
        <Route path='/' element={<Main />} />
        <Route path='/' element={<Main />} />
        <Route path='/' element={<Main />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
