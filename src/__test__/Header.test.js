import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '../components/header/Header';

describe('Header', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <RecoilRoot>
        <Router>
          <Header />
        </Router>
      </RecoilRoot>,
    );
  });

  it('render Header text', () => {
    expect(screen.getByText('P.P.C.')).toHaveTextContent('P.P.C.');
    expect(screen.getByText('Login')).toHaveTextContent('Login');
  });

  it('Text color must match.', () => {
    expect(screen.getByText('Login')).toHaveStyle({ color: 'ButtonText' });
  });
});
