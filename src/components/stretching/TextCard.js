import React from 'react';

import styled from 'styled-components';

const TextCard = () => {
  return (
    <CardWrap>
      {/* <div className='text-area-title'>
        위의 스트레칭 자세를 참고하여 스트레칭을 진행해 주세요.
      </div> */}
      <div className='text-area-description'>
        두 팔을 들어 120'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔을
        안쪽으로 당기는 느낌을 받으며 당겨줍니다. 그 자세로 최소 10초 이상
        유지합니다.
      </div>
    </CardWrap>
  );
};

export default TextCard;

const CardWrap = styled.div`
  margin: auto 30px;
  padding: 20px 10px;
  border-radius: 10px;

  .text-area-title {
    margin-bottom: 5px;
    background-color: #948df9;
  }

  .text-area-description {
    background-color: #f8e9ed;
  }
`;
