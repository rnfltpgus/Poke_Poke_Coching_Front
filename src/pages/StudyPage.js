import React from 'react';

import StudyMode from '../components/StudyMode';

import styled from 'styled-components';

function studyPage() {
  return (
    <StudyWrap>
      <div className='stretching-container'>
        <div className='study-mode'>
          <StudyMode />
        </div>
        <div className='select-mode'></div>
      </div>
    </StudyWrap>
  );
}

export default studyPage;

const StudyWrap = styled.div`
  & div {
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    color: black;
    flex: 1;
    box-sizing: border-box;
    font-weight: bold;
  }

  .stretching-container {
    border-radius: 10px;
    width: 95%;
    margin: 30px auto 10px auto;
    gap: 2rem;
    display: flex;
  }

  .study-mode {
    height: 700px;
  }

  .select-mode {
    height: 700px;
  }
`;
