import React from 'react';

import styled from 'styled-components';

const CheckNotice = () => {
  return (
    <CheckNoticeWrap>
      <div className='check-title'>🏃🏻 Check Notice</div>
      <div className='check-description'>
        스트레칭 또는 산책을 다녀오는 것이 좋을 것 같습니다.
      </div>
      <div className='check-description-second'>
        - 귀볼을 잡고 손바닥을 위로 향하게 돌리서 양뱡향으로 당기는 자세를 3초
        유지하면 스트레칭 페이지로 이동합니다.
      </div>
    </CheckNoticeWrap>
  );
};

export default CheckNotice;

const CheckNoticeWrap = styled.div`
  .check-title {
    margin: 2rem;
    font-size: 2rem;
    font-weight: bold;
    justify-content: center;
    text-align: center;
  }

  .check-description {
    margin-top: 3.8rem;
    padding: 2rem;
    font-size: 1.5rem;
    justify-content: center;
    text-align: center;
  }

  .check-description-second {
    margin: 0rem 3.2rem 0rem 4.2rem;
  }
`;
