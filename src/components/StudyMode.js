import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';
import { useSetRecoilState, useResetRecoilState } from 'recoil';

import { conditionState } from '../recoil/atom';
import { drawKeyPoints, drawSkeleton } from '../util/helpers/utils';
import { piano } from '../util/music/index';

import styled from 'styled-components';

let interval;

const StudyMode = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStartPose, setIsStartPose] = useState(false);
  const condition = useSetRecoilState(conditionState);
  const resetCount = useResetRecoilState(conditionState);
  const [filter, SetFilter] = useState();

  const runPoseNet = async () => {
    const poseNetLoad = await poseNet.load({
      scale: 0.7,
    });

    const countAudio = new Audio(piano);
    countAudio.loop = true;

    interval = setInterval(() => {
      poseDetect(poseNetLoad, countAudio);
    }, 100);
  };

  const default_Left_Eye_Position = [];
  const default_Right_Eye_Position = [];
  let warnings = 0;

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
      const poseKeyPoints = pose.keypoints;

      for (let i = 0; i < poseKeyPoints.length; i++) {
        const right_Eye = poseKeyPoints[1].position;
        const left_Eye = poseKeyPoints[2].position;

        default_Right_Eye_Position.length < 1 &&
          default_Right_Eye_Position.push(right_Eye.y);
        default_Left_Eye_Position.length < 1 &&
          default_Left_Eye_Position.push(left_Eye.y);

        if (Math.ceil(right_Eye.y - default_Right_Eye_Position[0]) > 10) {
          const separationGap =
            Math.ceil(right_Eye.y - default_Right_Eye_Position[0]) > 10;
          const waringCount = Math.floor(warnings / 100);

          countAudio.play();

          if (separationGap) {
            warnings = warnings + 1;
          }

          condition({ warnings: waringCount });
        }

        if (Math.ceil(right_Eye.y - default_Right_Eye_Position[0]) <= 10) {
          countAudio.pause();
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

  const modeStart = () => {
    setIsStartPose(true);
    runPoseNet();
  };

  const modeStop = () => {
    setIsStartPose(false);
    resetCount();
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

  .secondary-btn {
    bottom: 60rem;
  }
`;
