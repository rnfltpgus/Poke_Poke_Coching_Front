import React, { useState } from 'react';
import TimerCountDown from './countcomponent/TimerComponent';
import InputCountDown from './countcomponent/InputComponent';

const CountdownTimer = () => {
  const [isTimerRunning, setTimerRunning] = useState(false);
  const timerValue = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const [timer, setTimer] = useState(timerValue);

  const startCountdown = (timerData) => {
    setTimer(timerData);
    setTimerRunning(!isTimerRunning);
  };

  const stopCountdown = () => {
    setTimer(timerValue);
    setTimerRunning(!isTimerRunning);
  };

  return (
    <div>
      {isTimerRunning ? (
        <TimerCountDown
          timerData={timer}
          stopCountdown={stopCountdown}
          setTimerRunning={setTimerRunning}
        />
      ) : (
        <InputCountDown startCountdown={startCountdown} />
      )}
    </div>
  );
};

export default CountdownTimer;
