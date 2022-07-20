import React from 'react';

import styled from 'styled-components';

const CheckNotice = () => {
  return (
    <CheckNoticeWrap>
      <div className='check-title'>🏃🏻 Check Notice</div>
      <div className='check-description'>
        스트레칭 또는 산책을 다녀오는 것이 좋을 것 같습니다.
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
    margin-top: 4.7rem;
    padding: 2rem;
    font-size: 1.5rem;
    justify-content: center;
    text-align: center;
  }
`;
