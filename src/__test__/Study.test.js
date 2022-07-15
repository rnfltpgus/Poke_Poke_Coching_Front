import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import StudyMode from '../components/study/StudyMode';

const MockStudyPage = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <StudyMode />
      </RecoilRoot>
    </BrowserRouter>
  );
};

describe('<StudyPage />', () => {
  it('render StudyPage page text', () => {
    render(<MockStudyPage />);

    const studyMode = screen.getByText('공부 모드');
    expect(studyMode).toHaveTextContent('공부 모드');

    const studyModeStart = screen.getByText('Mode Start');
    expect(studyModeStart).toHaveTextContent('Mode Start');
  });
});
