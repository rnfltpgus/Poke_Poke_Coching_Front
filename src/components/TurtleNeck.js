import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';

import { drawKeyPoints, drawSkeleton } from '../util/helpers/utils';
import { count } from '../util/music/index';

import styled from 'styled-components';

let flag = false;

const TurtleNeck = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
  }, []);

  const runPoseNet = async () => {
    const poseNetLoad = await poseNet.load({
      scale: 0.8,
    });

    const countAudio = new Audio(count);
    countAudio.loop = true;

    setInterval(() => {
      poseDetect(poseNetLoad, countAudio);
    }, 100);
  };

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
      const correctPosture = checkHandsUpDown(pose);

      if (pose.score > 0.7) {
        if (correctPosture === true) {
          if (!flag) {
            countAudio.play();
            setStartingTime(new Date(Date()).getTime());
            flag = true;
          }
          setCurrentTime(new Date(Date()).getTime());
        } else {
          flag = false;
          countAudio.pause();
          countAudio.currentTime = 0;
        }
      }

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const minPartConfidence = 0.6;
    const context = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeyPoints(pose.keypoints, minPartConfidence, context);
    drawSkeleton(pose.keypoints, minPartConfidence, context);
  };

  const checkHandsUpDown = (pose) => {
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
      const shoulder = left_Shoulder.x - right_Shoulder.x;
      if (
        shoulder < right_Shoulder.x - right_Elbow.x &&
        shoulder < left_Elbow.x - left_Shoulder.x
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  runPoseNet();

  return (
    <TurtleNeckWrap>
      <h4 className='count-down'>Count Down: {poseTime} s</h4>
      <h4 className='maintain-time'>Maintain Time: {bestPerform} s</h4>
      <Webcam ref={webcamRef} className='webcam' />
      <canvas ref={canvasRef} className='canvas' />
    </TurtleNeckWrap>
  );
};

export default TurtleNeck;

const TurtleNeckWrap = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
  height: 100%;

  & h4 {
    margin-bottom: 5px;
  }

  .count-down {
    background-color: #ffc3a0;
    padding: 5px;
    border-radius: 10px;
  }

  .maintain-time {
    background-color: #ffafbd;
    padding: 5px;
    border-radius: 10px;
  }

  .webcam {
    position: absolute;
    top: 105px;
    left: 0;
    width: 100%;
    height: 600px;
  }
  .canvas {
    position: absolute;
    top: 105px;
    left: 0;
    width: 100%;
    height: 600px;
  }
`;
