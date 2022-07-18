import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Main = () => {
  return (
    <SelectMode>
      <Link to='/studypage'>
        <div className='study-page'>
          <span>공부 모드</span>
        </div>
      </Link>
      <Link to='/stretchingpage'>
        <div className='stretching-page'>
          <span>스트레이칭 모드</span>
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
    line-height: 5vh;
    text-align: center;
    color: black;
    flex: 1;
    height: 87vh;
    box-sizing: border-box;
    font-weight: bold;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    transform: translateY(0);

    :hover {
      transform: translateY(-10px);
    }
  }

  & span {
    float: left;
    background-color: #d4d1ff;
    padding: 0 10px;
    border-radius: 10px;
  }

  .study-page {
    background-image: url('img/studymode.png');
    background-size: cover;
  }

  .stretching-page {
    background-image: url('img/stretchingmode.png');
    background-size: cover;
  }
`;
