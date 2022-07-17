import React, { useState } from 'react';

import styled from 'styled-components';

const InputComponent = (props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const startTimer = () => {
    props.startCountdown({
      hours,
      minutes,
      seconds,
    });
  };

  const handleSetTimer = (input) => {
    const max = 60;

    if (input === 'incHours' && hours + 1 < 24) {
      setHours(hours + 1);
    } else if (input === 'decHours') {
      setHours(hours - 1);
    } else if (input === 'incMinutes' && minutes + 1 < max) {
      setMinutes(minutes + 1);
    } else if (input === 'decMinutes' && minutes - 1 >= 0) {
      setMinutes(minutes - 1);
    } else if (input === 'incSeconds' && seconds + 1 < max) {
      setSeconds(seconds + 1);
    } else if (input === 'decSeconds' && seconds - 1 >= 0) {
      setSeconds(seconds - 1);
    }
  };

  return (
    <InputComponentWrap>
      <div className='countdown-header'>Countdown Timer</div>
      <div>
        <div className='countdown-display'>
          <div className='countdown-item'>
            <div>
              <button
                className='increase-btn'
                onClick={() => handleSetTimer('incHours')}></button>
            </div>
            <div className='countdown-time'>{hours} 시</div>
            <div>
              <button
                className='decrease-btn'
                onClick={() => handleSetTimer('decHours')}></button>
            </div>
          </div>
          <div className='countdown-item'>
            <div>
              <button
                className='increase-btn'
                onClick={() => handleSetTimer('incMinutes')}></button>
            </div>
            <div className='countdown-time'>{minutes} 분</div>
            <div>
              <button
                className='decrease-btn'
                onClick={() => handleSetTimer('decMinutes')}></button>
            </div>
          </div>
          <div className='countdown-item'>
            <div>
              <button
                className='increase-btn'
                onClick={() => handleSetTimer('incSeconds')}></button>
            </div>
            <div className='countdown-time'>{seconds} 초</div>
            <div>
              <button
                className='decrease-btn'
                onClick={() => handleSetTimer('decSeconds')}></button>
            </div>
          </div>
        </div>
        <div onClick={startTimer}>
          <button>Start</button>
        </div>
      </div>
    </InputComponentWrap>
  );
};

export default InputComponent;

const InputComponentWrap = styled.div`
  width: 95%;
  margin: 30px auto 10px auto;
  gap: 2rem;

  .countdown-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }

  .countdown-display {
    border-radius: 10px;
    width: 95%;
    margin: 20px 10px auto;
    gap: 2rem;
    display: flex;
  }

  .increase-btn {
    width: 20px;
    height: 20px;
    border-radius: 50px 50% 50% 5px;
    border: saddlebrown;
    background-color: #f898ff;
  }

  .decrease-btn {
    width: 20px;
    height: 20px;
    border-radius: 5px 5px 50px 50%;
    border: saddlebrown;
    background-color: #ffafbd;
  }

  .countdown-time {
    font-size: 18px;
  }
`;
