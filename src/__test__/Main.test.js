import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Main from '../pages/Main';

describe('Main', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <RecoilRoot>
        <Router>
          <Main />
        </Router>
      </RecoilRoot>,
    );
  });

  it('render Main page text', () => {
    expect(screen.getByText('공부 모드')).toBeInTheDocument();
    expect(screen.getByText('스트레칭 모드')).toBeInTheDocument();
  });
});
