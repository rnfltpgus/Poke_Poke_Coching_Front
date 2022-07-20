import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import StretchingPage from '../pages/StretchingPage';

const MockStretchingPage = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <StretchingPage />
      </RecoilRoot>
    </BrowserRouter>
  );
};

describe('<StretchingPage />', () => {
  it('render StretchingPage page text', () => {
    render(<MockStretchingPage />);

    // const turtleNecks = screen.getAllByText('TurtleNeck');
    // expect(turtleNecks).toHaveTextContent('TurtleNeck');

    const Arm = screen.getByText('Arm');
    expect(Arm).toHaveTextContent('Arm');

    const sideNeck = screen.getByText('SideNeck');
    expect(sideNeck).toHaveTextContent('SideNeck');

    const countDown = screen.getByText('Count Down : 0 s');
    expect(countDown).toHaveTextContent('Count Down : 0 s');

    const maxMaintainTime = screen.getByText('Max Maintain Time : 0 s');
    expect(maxMaintainTime).toHaveTextContent('Max Maintain Time : 0 s');
  });
});
