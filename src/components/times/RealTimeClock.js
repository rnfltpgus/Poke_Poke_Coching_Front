import React, { useState, useRef, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { conditionState, timeState } from '../../recoil/atom';
import Modal from '../modal/Modal';
import CheckNotice from '../modal/contextualmodal/CheckNotice';
import padNumber from '../../util/helpers/padNumber';
import { checkSound } from '../../util/music/index';

import styled from 'styled-components';

const RealTimeClock = () => {
  let now = new Date();
  const [hour, setHour] = useState(padNumber(now.getHours(), 2));
  const [min, setMin] = useState(padNumber(now.getMinutes(), 2));
  const [sec, setSec] = useState(padNumber(now.getSeconds(), 2));
  const [modalOn, setModalOn] = useState(false);
  const checkSoundAudio = new Audio(checkSound);
  const studyTime = useSetRecoilState(timeState);
  const runTime = useRecoilValue(timeState);
  const currentCondition = useRecoilValue(conditionState);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      now = new Date();
      setHour(padNumber(now.getHours(), 2));
      setMin(padNumber(now.getMinutes(), 2));
      setSec(padNumber(now.getSeconds(), 2));
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    let interval = null;
    if (currentCondition.studyModeOn) {
      interval = setInterval(() => {
        studyTime((pre) => pre + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentCondition.studyModeOn, studyTime]);

  useEffect(() => {
    // if ((currentCondition.studyModeOn === true && runTime % 3600000) === 0) {
    // 시연용 타이머 시간
    if ((currentCondition.studyModeOn === true && runTime % 100000) === 0) {
      setModalOn(true);
      checkSoundAudio.play();
      setTimeout(() => {
        checkSoundAudio.pause();
        closeModal();
      }, 6000);
    }
  }, [runTime]);

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <RealTimeClockWrap>
      <div>
        <div className='realtime-header'>Real Time</div>
        <div className='realtime'>
          {hour}시 {min}분 {sec}초
        </div>
      </div>
      <div>
        <div className='realtime-study-header'>Real Study Time</div>
        <div className='realtime'>
          <span>
            {('0' + Math.floor((runTime / 3600000) % 60)).slice(-2)}시{' '}
          </span>
          <span>{('0' + Math.floor((runTime / 60000) % 60)).slice(-2)}분 </span>
          <span>{('0' + Math.floor((runTime / 1000) % 60)).slice(-2)}초 </span>
        </div>
      </div>
      {modalOn && (
        <Modal
          visible={modalOn}
          backGroundClosable={true}
          onClose={closeModal}
          backGroundColor={'rgb(56, 255, 209, 0.6)'}>
          <CheckNotice />
        </Modal>
      )}
    </RealTimeClockWrap>
  );
};

export default RealTimeClock;

const RealTimeClockWrap = styled.div`
  display: flex;
  width: 95%;
  margin: 3vh auto 1vw auto;

  .realtime-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 1.5rem;
  }

  .realtime-study-header {
    background-color: #b568f3;
    color: #fff;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 1.5rem;
  }

  .realtime {
    font-size: 1.4rem;
  }
`;
