import React from 'react';

import styled from 'styled-components';

const TextCard = () => {
  return (
    <CardWrap>
      <div className='text-area-title'>
        위의 스트레칭 자세를 참고하여 스트레칭을 진행해 주세요.
      </div>
      <div className='text-area-description'>
        두 팔을 들어 120'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔
        안쪽이 당기는 느낌을 받습니다. 10초 유지합니다.
      </div>
    </CardWrap>
  );
};

export default TextCard;

const CardWrap = styled.div`
  margin: 0 30px;
  padding: 0 10px;
  border-radius: 10px;

  .text-area-title {
    background-color: #87ecfa;
  }

  .text-area-description {
    background-color: #ff6464;
  }
`;
