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

  it('Clicking Mode Start changes Mode Stop and pressing the Mode Stop button changes Mode Start.', () => {
    fireEvent.click(screen.getByText('Mode Start'));
    expect(screen.getByText('Mode Stop')).toHaveTextContent('Mode Stop');

    fireEvent.click(screen.getByText('Mode Stop'));
    expect(screen.getByText('Mode Start')).toHaveTextContent('Mode Start');
  });

  it('Text color must match.', () => {
    expect(screen.getByText('Mode Start')).toHaveStyle({
      color: 'rgb(255, 255, 255)',
    });
  });
});
