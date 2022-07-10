import React, { Component } from 'react';

import styled from 'styled-components';

class CountDownTimer extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  };

  handleSetTimer = (input) => {
    const { timerTime, timerOn } = this.state;
    const max = 216000000;
    if (!timerOn) {
      if (input === 'incHours' && timerTime + 3600000 < max) {
        this.setState({
          timerTime: timerTime + 3600000,
        });
      } else if (input === 'decHours' && timerTime - 3600000 >= 0) {
        this.setState({
          timerTime: timerTime - 3600000,
        });
      } else if (input === 'incMinutes' && timerTime + 60000 < max) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === 'decMinutes' && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === 'incSeconds' && timerTime + 1000 < max) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === 'decSeconds' && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      } else if (input === 'incMSeconds' && timerTime + 10 < max) {
        this.setState({ timerTime: timerTime + 10 });
      } else if (input === 'decMSeconds' && timerTime - 10 >= 0) {
        this.setState({ timerTime: timerTime - 10 });
      }
    }
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    });

    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({
          timerOn: false,
          timerStart: 0,
          timerTime: 0,
        });
      }
    }, 10);
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  stopTimer = () => {
    this.setState({
      timerOn: false,
      timerTime: 0,
      timerStart: 0,
    });
    clearInterval(this.timer);
  };

  componentDidMount = () => {
    if (localStorage.getItem('timerStart') !== null) {
      let previousState = JSON.parse(localStorage.getItem('timerStart'));
      if (previousState.timerStart > 0) {
        this.reStartTimer();
      }
    }

    document.addEventListener('keydown', this.maintainLaps, false);
    window.addEventListener('beforeunload', this.handleTabClose);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.maintainLaps, false);
    window.removeEventListener('beforeunload', this.handleTabClose);
  };

  reStartTimer = () => {
    if (localStorage.getItem('timerStart') !== null) {
      let previousState = JSON.parse(localStorage.getItem('timerStart'));
      this.setState({
        timerOn: true,
        timerStart: previousState.timerStart,
        timerTime: previousState.timerTime,
      });
    }

    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
      }
    }, 10);
  };

  handleTabClose = () => {
    localStorage.setItem('timerStart', JSON.stringify(this.state));
  };

  render() {
    const { timerTime, timerStart, timerOn } = this.state;

    let seconds = ('0' + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ('0' + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <CountDownTimerWrap className='countdown'>
        <div className='countdown-header'>Countdown Timer</div>
        <div className='countdown-display'>
          <div className='countdown-item'>
            <div className='countdown-label'>Hour</div>
            <div>
              <button
                className='increase-btn'
                onClick={() => this.handleSetTimer('incHours')}></button>
            </div>
            <div className='countdown-time'>{hours}</div>
            <div>
              <button
                className='decrease-btn'
                onClick={() => this.handleSetTimer('decHours')}></button>
            </div>
          </div>
          <div className='countdown-item'>
            <div className='countdown-label'>Min</div>
            <div>
              <button
                className='increase-btn'
                onClick={() => this.handleSetTimer('incMinutes')}></button>
            </div>
            <div className='countdown-time'>{minutes}</div>
            <div>
              <button
                className='decrease-btn'
                onClick={() => this.handleSetTimer('decMinutes')}></button>
            </div>
          </div>
          <div className='countdown-item'>
            <div className='countdown-label'>Sec</div>
            <div>
              <button
                className='increase-btn'
                onClick={() => this.handleSetTimer('incSeconds')}></button>
            </div>
            <div className='countdown-time'>{seconds}</div>
            <div>
              <button
                className='decrease-btn'
                onClick={() => this.handleSetTimer('decSeconds')}></button>
            </div>
          </div>
        </div>

        <div className='action-btn'>
          {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
            <button
              className='start-btn'
              onClick={this.startTimer}
              disabled={timerTime === 0}>
              Start
            </button>
          )}

          {timerOn === true && timerTime >= 1000 && (
            <button className='pause-btn' onClick={this.pauseTimer}>
              Pause
            </button>
          )}

          {timerOn === false &&
            timerStart !== 0 &&
            timerStart !== timerTime &&
            timerTime !== 0 && (
              <button className='resume-btn' onClick={this.startTimer}>
                Resume
              </button>
            )}

          {timerOn === true && (
            <button className='stop-btn' onClick={this.stopTimer}>
              Stop
            </button>
          )}
        </div>
      </CountDownTimerWrap>
    );
  }
}

export default CountDownTimer;

const CountDownTimerWrap = styled.div`
  width: 95%;
  margin: 20px auto 10px auto;
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
    margin: 10px auto;
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

  .pause-btn {
    margin-right: 10px;
  }
`;
