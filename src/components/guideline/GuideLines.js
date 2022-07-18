import React from 'react';

import styled from 'styled-components';

const GuideLines = () => {
  return (
    <GuideLinesWrap>
      <div className='guide-line-title'>🧩 GuideLines</div>
      <div className='guide-line-description'>
        <div>1. 공부모드와 스트레칭 모드로 구성되어 있습니다.</div>
        <div>2. 공부모드와 스트레칭 모드로 구성되어 있습니다.</div>
        <div>3. 공부모드와 스트레칭 모드로 구성되어 있습니다.</div>
        <div>5. 공부모드와 스트레칭 모드로 구성되어 있습니다.</div>
        <div>6. 공부모드와 스트레칭 모드로 구성되어 있습니다.</div>
        <div>7. 공부모드와 스트레칭 모드로 구성되어 있습니다.</div>
      </div>
    </GuideLinesWrap>
  );
};

export default GuideLines;

const GuideLinesWrap = styled.div`
  .guide-line-title {
    margin: 2rem auto 1rem auto;
    font-size: 2rem;
    font-weight: bold;
    justify-content: center;
    text-align: center;
  }

  .guide-line-description {
    width: 100%;
    padding: 0.4rem 1rem 1rem 1rem;
    font-size: 1.2rem;

    div {
      margin-top: 1rem;
    }
  }
`;
