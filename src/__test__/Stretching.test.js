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
  });
});
