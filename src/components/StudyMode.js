import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';

import { drawKeyPoints, drawSkeleton } from '../util/helpers/utils';
import { piano } from '../util/music/index';

import styled from 'styled-components';

let interval;

const StudyMode = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStartPose, setIsStartPose] = useState(false);
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

        while (default_Right_Eye_Position.length < 1) {
          default_Right_Eye_Position.push(right_Eye.y);
        }

        while (default_Left_Eye_Position.length < 1) {
          default_Left_Eye_Position.push(left_Eye.y);
        }

        if (Math.ceil(right_Eye.y - default_Right_Eye_Position[0]) > 10) {
          countAudio.play();
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
    clearInterval(interval);
  };

  if (isStartPose) {
    return (
      <StudyModeWrap>
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
      <button onClick={modeStart}>Mode Start</button>
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
`;
