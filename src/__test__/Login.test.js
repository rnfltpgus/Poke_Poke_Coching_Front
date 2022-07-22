import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Login from '../pages/Login';

describe('Login', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <RecoilRoot>
        <Router>
          <Login />
        </Router>
      </RecoilRoot>,
    );
  });

  it('render Login page text', () => {
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    expect(screen.getByText('© 2022 Reserved by Seny')).toBeInTheDocument();
  });
});
