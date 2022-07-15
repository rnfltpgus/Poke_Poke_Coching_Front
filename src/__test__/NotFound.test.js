import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import NotFoundPage from '../pages/NotFoundPage';

const MockNotFoundPage = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <NotFoundPage />
      </RecoilRoot>
    </BrowserRouter>
  );
};

describe('<NotFoundPage />', () => {
  it('render NotFoundPage page text', () => {
    render(<MockNotFoundPage />);

    const notFoundTitle = screen.getByText('Not Found Page');
    expect(notFoundTitle).toHaveTextContent('Not Found Page');

    const buttonName = screen.getByText('이전 페이지');
    expect(buttonName).toHaveTextContent('이전 페이지');
  });
});
