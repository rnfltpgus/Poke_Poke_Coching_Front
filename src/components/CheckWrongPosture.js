import React from 'react';
import { useRecoilValue } from 'recoil';

import { conditionState } from '../recoil/atom';
import styled from 'styled-components';

const CheckWrongPosture = () => {
  const currentCondition = useRecoilValue(conditionState);

  return (
    <CheckWrongPostureWrap>
      <div className='CheckWrongPosture-header'>CheckWrongPosture</div>
      <div>{currentCondition.warnings} 회</div>
    </CheckWrongPostureWrap>
  );
};

export default CheckWrongPosture;

const CheckWrongPostureWrap = styled.div`
  width: 95%;
  margin: 20px auto 10px auto;
  gap: 2rem;

  .CheckWrongPosture-header {
    background-color: #f17ca4;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }
`;
