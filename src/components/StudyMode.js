import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import * as poseNet from '@tensorflow-models/posenet';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { conditionState } from '../recoil/atom';
import { drawKeyPoints, drawSkeleton } from '../util/tensorflow/utils';
import { loud } from '../util/music/index';

import styled from 'styled-components';

let interval;

const StudyMode = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [isStartPose, setIsStartPose] = useState(false);
  const condition = useSetRecoilState(conditionState);
  const conditionCheck = useRecoilValue(conditionState);

  const runPoseNet = async () => {
    const poseNetLoad = await poseNet.load({
      scale: 0.8,
    });
    const countAudio = new Audio(loud);

    interval = setInterval(() => {
      poseDetect(poseNetLoad, countAudio);
    }, 100);
  };

  const default_Right_Eye_Position = [];
  const default_Left_Eye_Position = [];
  const keepPosture = [];
  let warnings = conditionCheck.warnings;
  let warningCount = conditionCheck.warnings;

  const poseDetect = async (poseNetLoad, countAudio) => {
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
      const correctPosture = handsBehindNeckSignSwitchPage(pose);
      const poseKeyPoints = pose.keypoints;

      for (let i = 0; i < poseKeyPoints.length; i++) {
        const right_Eye = poseKeyPoints[1].position;
        const left_Eye = poseKeyPoints[2].position;
        const right_InitialValues = default_Right_Eye_Position.length < 1;
        const left_InitialValues = default_Right_Eye_Position.length < 1;
        const coordinateDifference = Math.ceil(
          right_Eye.y - default_Right_Eye_Position[0],
        );

        right_InitialValues && default_Right_Eye_Position.push(right_Eye.y);
        left_InitialValues && default_Left_Eye_Position.push(left_Eye.y);

        if (coordinateDifference > 30) {
          warnings = warnings + 1;
          warningCount = Math.floor(warnings / 150);
          countAudio.play();
          condition({ warnings: warningCount, studyModeOn: false });
        } else {
          condition({ warnings: warningCount, studyModeOn: true });
        }

        if (Math.ceil(coordinateDifference <= 30)) {
          countAudio.pause();
        }
      }

      if (correctPosture) {
        if (keepPosture.length === 20) {
          countAudio.pause();
          condition({ studyModeOn: false });
          navigate('/stretchingpage');
        }
      }

      // drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const minPartConfidence = 0.7;
    const context = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeyPoints(pose.keypoints, minPartConfidence, context);
    drawSkeleton(pose.keypoints, minPartConfidence, context);
  };

  const checkPutYourHandsUp = (pose) => {
    const head = pose.keypoints[0].position;
    const left_Shoulder = pose.keypoints[5].position;
    const right_Shoulder = pose.keypoints[6].position;
    const left_Elbow = pose.keypoints[7].position;
    const right_Elbow = pose.keypoints[8].position;
    const left_Wrist = pose.keypoints[9].position;
    const right_Wrist = pose.keypoints[10].position;

    if (
      right_Elbow.y < right_Shoulder.y &&
      left_Elbow.y < left_Shoulder.y &&
      right_Elbow.x < head.x &&
      head.x < left_Elbow.x
    ) {
      if (right_Wrist.y < head.y && left_Wrist.y < head.y) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handsBehindNeckSignSwitchPage = (pose) => {
    const left_Elbow = pose.keypoints[7].position;
    const right_Elbow = pose.keypoints[8].position;
    const left_Wrist = pose.keypoints[9].position;
    const right_Wrist = pose.keypoints[10].position;

    if (checkPutYourHandsUp(pose)) {
      if (
        (right_Elbow.x < right_Wrist.x && right_Wrist.y > right_Elbow.y) ||
        (right_Elbow.x > right_Wrist.x && left_Elbow.y < left_Wrist.y)
      ) {
        keepPosture.push(true);

        return true;
      }
      keepPosture.pop();

      return false;
    } else {
      return false;
    }
  };

  const modeStart = () => {
    setIsStartPose(true);
    condition({ warnings: conditionCheck.warnings, studyModeOn: true });
    runPoseNet();
  };

  const modeStop = () => {
    setIsStartPose(false);
    condition({ warnings: 0, studyModeOn: false });
    clearInterval(interval);
  };

  if (isStartPose) {
    return (
      <StudyModeWrap>
        <span className='study-mode-title'>공부 모드</span>
        <canvas ref={canvasRef} className='canvas' />
        <Webcam ref={webcamRef} className='webcam' />
        <button onClick={modeStop} className='secondary-btn'>
          Mode Stop
        </button>
      </StudyModeWrap>
    );
  }

  return (
    <StudyModeWrap>
      <span className='study-mode-title'>공부 모드</span>
      <button onClick={modeStart} className='secondary-btn'>
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
    top: 60px;
    left: 0;
    width: 100%;
    height: 600px;
  }

  .canvas {
    z-index: 10;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 600px;
  }

  .study-mode-title {
    float: left;
    background-color: #d4d1ff;
    margin-top: 10px;
    margin-left: 10px;
    padding: 0 10px;
    border-radius: 10px;
  }
`;
