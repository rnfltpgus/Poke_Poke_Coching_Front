import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import NotFoundPage from '../pages/NotFoundPage';

describe('NotFoundPage', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <RecoilRoot>
        <Router>
          <NotFoundPage />
        </Router>
      </RecoilRoot>,
    );
  });

  it('render NotFoundPage page text', () => {
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
    expect(screen.getByText('이전 페이지')).toBeInTheDocument();
  });
});
