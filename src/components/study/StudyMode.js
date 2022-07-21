import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { conditionState } from '../../recoil/atom';
import StrongManPose from '../../util/tensorflow/posturecheck/StrongManPose';
import { warningSound } from '../../util/music/index';

import styled from 'styled-components';

let interval;
let warnings = 0;
let warningCount = 0;

const StudyMode = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [isStartPose, setIsStartPose] = useState(false);
  const condition = useSetRecoilState(conditionState);
  const conditionCheck = useRecoilValue(conditionState);

  const runPoseNet = async () => {
    const poseNetLoad = await poseNet.load({
      scale: 0.8,
    });
    const warningAudio = new Audio(warningSound);

    interval = setInterval(() => {
      poseDetect(poseNetLoad, warningAudio);
    }, 100);
  };

  const default_Head_X_Position = [];
  const default_Head_Y_Position = [];
  const pageChangeCount = [];

  const poseDetect = async (poseNetLoad, warningAudio) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const { videoWidth, videoHeight } = webcamRef.current.video;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await poseNetLoad.estimateSinglePose(video);
      const stretchingModeChangePose = StrongManPose(pose);

      for (let i = 0; i < pose.keypoints.length; i++) {
        const head = pose.keypoints[0].position;
        const head_X_InitialValues = default_Head_X_Position.length < 1;
        const head_Y_InitialValues = default_Head_Y_Position.length < 1;
        const head_X_Coordinate_Difference = Math.ceil(
          head.x - default_Head_X_Position[0],
        );
        const head_Y_Coordinate_Difference = Math.ceil(
          head.y - default_Head_Y_Position[0],
        );

        head_X_InitialValues && default_Head_X_Position.push(head.x);
        head_Y_InitialValues && default_Head_Y_Position.push(head.y);

        if (
          head_Y_Coordinate_Difference > 200 ||
          head_X_Coordinate_Difference > 100 ||
          head_X_Coordinate_Difference < -100 ||
          head === null
        ) {
          warnings = warnings + 1;
          warningCount = Math.floor(warnings / 250);
          warningAudio.play();
          condition({ warnings: warningCount, studyModeOn: false });
        } else {
          condition({ warnings: warningCount, studyModeOn: true });
          warningAudio.pause();
        }
      }

      if (stretchingModeChangePose === true) {
        pageChangeCount.push(true);

        if (pageChangeCount.length === 30) {
          warningAudio.pause();
          condition({ studyModeOn: false });
          navigate('/stretchingpage');
        }
      } else {
        pageChangeCount.pop();
      }
    }
  };

  const modeStart = () => {
    setIsStartPose(true);
    condition({ warnings: conditionCheck.warnings, studyModeOn: true });
    runPoseNet();
  };

  const modeStop = () => {
    setIsStartPose(false);
    condition({ warnings: conditionCheck.warnings, studyModeOn: false });
    clearInterval(interval);
  };

  if (isStartPose) {
    return (
      <StudyModeWrap>
        <span className='study-mode-title'>공부 모드</span>
        <Webcam mirrored={true} ref={webcamRef} className='webcam' />
        <button onClick={modeStop} className='secondary-stop-btn'>
          Mode Stop
        </button>
      </StudyModeWrap>
    );
  }

  return (
    <StudyModeWrap>
      <span className='study-mode-title'>공부 모드</span>
      <button onClick={modeStart} className='secondary-start-btn'>
        Mode Start
      </button>
    </StudyModeWrap>
  );
};

export default StudyMode;

const StudyModeWrap = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
  height: 100%;

  .webcam {
    position: absolute;
    left: 1.3rem;
    width: 44.5vw;
    height: 74.2vh;
    border-radius: 10px;
  }

  .study-mode-title {
    position: absolute;
    float: left;
    background-color: #d4d1ff;
    margin-top: 10px;
    margin-left: 10px;
    padding: 0 10px;
    left: 0;
    border-radius: 10px;
    z-index: 99;
  }

  .secondary-start-btn {
    position: absolute;
    top: 30vh;
    bottom: 30vh;
    left: 5vw;
    right: 5vw;
    border-radius: 10px;
    border: none;
    background-color: #4785f0;
    color: #fff;
    font-weight: bold;
    font-size: 5rem;
    transition: all 300ms ease-in-out;
    transform: translateY(0);
    cursor: pointer;

    :hover {
      transform: translateY(-15px);
      opacity: 0.7;
    }
  }

  .secondary-stop-btn {
    position: absolute;
    bottom: 1.5vh;
    left: 1vw;
    right: 1vw;
    height: 17vh;
    border-radius: 10px;
    border: none;
    background-color: rgb(255, 100, 100);
    color: #fff;
    font-weight: bold;
    font-size: 3rem;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    transform: translateY(0);

    :hover {
      transform: translateY(-5px);
    }
  }
`;
