import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Main from '../pages/Main';

const MockMain = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Main />
      </RecoilRoot>
    </BrowserRouter>
  );
};

describe('<Main />', () => {
  it('render Main page text', () => {
    render(<MockMain />);

    const studyPage = screen.getByText('공부 모드');
    expect(studyPage).toHaveTextContent('공부 모드');

    const stretchingPage = screen.getByText('스트레이칭 모드');
    expect(stretchingPage).toHaveTextContent('스트레이칭 모드');
  });
});
