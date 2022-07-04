import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Main = () => {
  return (
    <SelectMode>
      <Link to='/studyMode'>
        <div className='studyMode'>
          <span>공부모드</span>
        </div>
      </Link>
      <Link to='/stretchingMode'>
        <div className='stretchingMode'>
          <span>거북목 스트레이칭 모드</span>
        </div>
      </Link>
    </SelectMode>
  );
};

export default Main;

const SelectMode = styled.div`
  display: flex;
  width: 95%;
  margin: 30px auto;
  gap: 2rem;

  & a {
    width: 50%;
  }

  & div {
    padding: 10px;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    color: black;
    flex: 1;
    height: 600px;
    box-sizing: border-box;
    font-weight: bold;
  }

  & span {
    float: left;
    background-color: #87ecfa;
    padding: 0 10px;
    border-radius: 10px;
  }

  .studyMode {
    background-image: url('img/studymode.png');
    background-size: cover;
  }

  .stretchingMode {
    background-image: url('img/stretchingmode.png');
    background-size: cover;
  }
`;
