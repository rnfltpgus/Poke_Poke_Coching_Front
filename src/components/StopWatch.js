import React, { Component } from 'react';

import styled from 'styled-components';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: 0,
      curTimeStr: '00:00:00.000',
      isStarted: false,
    };

    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.resetTime = this.resetTime.bind(this);
  }

  toggleSwitch() {
    if (!this.state.isStarted) {
      this.setState({ isStarted: true }, () => {
        this.startTick();
      });
    } else {
      this.setState({ isStarted: false }, () => {
        this.endTick();
      });
    }
  }

  resetTime() {
    this.setState({
      curTime: 0,
      curTimeStr: '00:00:00.000',
    });
  }

  startTick() {
    this.tick = setInterval(() => {
      this.setState(
        {
          curTime: this.state.curTime + 1,
        },
        () => {
          this.setState({
            curTimeStr:
              new Date(this.state.curTime).toISOString().substr(11, 8) +
              '.' +
              (this.state.curTime % 1000),
          });
        },
      );
    }, 1);
  }

  endTick() {
    clearInterval(this.tick);
  }

  render() {
    return (
      <StopWatchWrap>
        <div className='stopwatch-header'>Stop Watch</div>
        <div>{this.state.curTimeStr}</div>
        <button className='start-btn' onClick={this.toggleSwitch}>
          {this.state.isStarted ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.resetTime}>Reset</button>
      </StopWatchWrap>
    );
  }
}

export default StopWatch;

const StopWatchWrap = styled.div`
  width: 95%;
  margin: 30px auto 10px auto;
  gap: 2rem;

  .stopwatch-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }

  .start-btn {
    margin-right: 10px;
  }
`;
