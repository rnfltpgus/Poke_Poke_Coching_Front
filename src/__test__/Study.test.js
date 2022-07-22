import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import StudyPage from '../pages/StudyPage';

describe('StudyPage', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <RecoilRoot>
        <Router>
          <StudyPage />
        </Router>
      </RecoilRoot>,
    );
  });

  it('render StudyPage page text', () => {
    expect(screen.getByText('공부 모드')).toBeInTheDocument();
    expect(screen.getByText('Mode Start')).toBeInTheDocument();
    expect(screen.getByText('Real Time')).toBeInTheDocument();
    expect(screen.getByText('Real Study Time')).toBeInTheDocument();
    expect(screen.getByText('Countdown Timer')).toBeInTheDocument();
    expect(screen.getByText('Stop Watch')).toBeInTheDocument();
    expect(screen.getByText('Check Wrong Posture')).toBeInTheDocument();
  });

  // it('진동 버튼을 누를 경우 화면에서는 X에서 O로 바뀌어야 합니다', async () => {
  //   const button = screen.getByText('Start');
  //   fireEvent.click(button);

  //   expect(await screen.findByTestId('Start')).toHaveTextContent('Reset');
  // });
});
