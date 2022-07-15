import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Login from '../pages/Login';

const MockLogin = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    </BrowserRouter>
  );
};

describe('<Login />', () => {
  it('render Login page text', () => {
    render(<MockLogin />);

    const loginFooter = screen.getByText('© 2022 Reserved by Seny');
    expect(loginFooter).toHaveTextContent('© 2022 Reserved by Seny');
  });
});
