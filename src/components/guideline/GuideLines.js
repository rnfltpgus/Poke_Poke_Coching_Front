import React from 'react';

import styled from 'styled-components';

const GuideLines = () => {
  return (
    <GuideLinesWrap>
      <div className='guide-line-title'>🧩 Guide Lines</div>
      <div className='guide-line-description'>
        <div> 1. 공부 모드와 스트레칭 모드로 구성되어 있습니다.</div>
        <div> 2. 공부 모드에서 Mode Start를 누르면 초기 자세가 측정되어,</div>
        <div className='guide-line-description-indent'>
          해당 자세로 올바름 정도를 체크하게 됩니다.
        </div>
        <div>
          3. 스트레칭 모드 진입 후, 좌측의 이미지와 하단의 설명을 참고하여,
        </div>
        <div className='guide-line-description-indent'>
          스트레칭을 진행해주세요.
        </div>
      </div>
    </GuideLinesWrap>
  );
};

export default GuideLines;

const GuideLinesWrap = styled.div`
  .guide-line-title {
    margin: 1rem auto 1rem auto;
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
      margin-top: 1.5rem;
    }

    .guide-line-description-indent {
      margin-left: 1.2rem;
    }
  }
`;
