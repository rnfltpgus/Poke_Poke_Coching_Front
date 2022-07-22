import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Main from '../pages/Main';
import StudyPage from '../pages/StudyPage';
// import StretchingPage from '../pages/StretchingPage';

describe('Main', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/studypage' element={<StudyPage />} />
            {/* <Route path='/stretchingpage' element={<StretchingPage />} /> */}
          </Routes>
        </Router>
      </RecoilRoot>,
    );
  });

  it('render Main page text', () => {
    expect(screen.getByText('공부 모드')).toBeInTheDocument();
    expect(screen.getByText('스트레칭 모드')).toBeInTheDocument();
  });

  it('If you click Study Mode, you should go to the Study Mode page.', () => {
    fireEvent.click(screen.getByText('공부 모드'));
    expect(screen.getByText('Mode Start')).toHaveTextContent('Mode Start');
  });

  // it('If you click Stretching, you should go to the Stretching page.', () => {
  //   fireEvent.click(screen.getByText('스트레칭 모드'));
  //   expect(screen.getByText('Arm')).toHaveTextContent('Arm');
  // });
});
