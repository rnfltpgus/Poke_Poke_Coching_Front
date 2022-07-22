import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import StretchingPage from '../pages/StretchingPage';

describe('StretchingPage', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <RecoilRoot>
        <Router>
          <StretchingPage />
        </Router>
      </RecoilRoot>,
    );
  });

  it('render StretchingPage page text', () => {
    // expect(screen.getByText('TurtleNeck')).toBeInTheDocument();
    expect(screen.getByText('Arm')).toBeInTheDocument();
    expect(screen.getByText('SideNeck')).toBeInTheDocument();
    expect(screen.getByText('Count Down : 0 s')).toBeInTheDocument();
    expect(screen.getByText('Max Maintain Time : 0 s')).toBeInTheDocument();
    expect(
      screen.getByText(
        '두 팔을 들어 120c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔을 몸 안쪽으로 당기는 느낌을 받으며 당겨주고, 자세를 유지합니다.',
      ),
    ).toBeInTheDocument();
  });
});
