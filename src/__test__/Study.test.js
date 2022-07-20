import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import StudyPage from '../pages/StudyPage';

const MockStudyPage = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <StudyPage />
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

    const realTime = screen.getByText('Real Time');
    expect(realTime).toHaveTextContent('Real Time');

    const realStudyTime = screen.getByText('Real Study Time');
    expect(realStudyTime).toHaveTextContent('Real Study Time');

    const countdownTimer = screen.getByText('Countdown Timer');
    expect(countdownTimer).toHaveTextContent('Countdown Timer');

    const stopWatch = screen.getByText('Stop Watch');
    expect(stopWatch).toHaveTextContent('Stop Watch');

    const checkWrongPosture = screen.getByText('Check Wrong Posture');
    expect(checkWrongPosture).toHaveTextContent('Check Wrong Posture');
  });

  // it('진동 버튼을 누를 경우 화면에서는 X에서 O로 바뀌어야 합니다', async () => {
  //   const button = screen.getByText('Start');
  //   fireEvent.click(button);

  //   expect(await screen.findByTestId('Start')).toHaveTextContent('Reset');
  // });
});
