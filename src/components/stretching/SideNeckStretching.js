import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';

import { drawKeyPoints, drawSkeleton } from '../../util/tensorflow/utils';
import { very } from '../../util/music/index';

import styled from 'styled-components';

let flag = false;

const SideNeckStretching = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);

  useEffect(() => {
    runPoseNet();
  }, []);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;

    if (flag) {
      setPoseTime(timeDiff);
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [bestPerform, currentTime, startingTime]);

  const runPoseNet = async () => {
    const poseNetLoad = await poseNet.load({
      scale: 0.8,
    });
    const countAudio = new Audio(very);

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
      const correctPosture = checkSideNeckStretching(pose);

      if (flag === null) {
        return;
      }

      if (correctPosture === true && pose.score > 0.55) {
        if (!flag) {
          countAudio.play();
          setStartingTime(new Date(Date()).getTime());
          flag = true;
        }
        setCurrentTime(new Date(Date()).getTime());
      } else {
        flag = false;
        countAudio.pause();
        setCurrentTime(0);
      }
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const minPartConfidence = 0.8;
    const context = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeyPoints(pose.keypoints, minPartConfidence, context);
    drawSkeleton(pose.keypoints, minPartConfidence, context);
  };

  const checkSideNeckStretching = (pose) => {
    const head = pose.keypoints[0].position;
    const left_Eye = pose.keypoints[1].position;
    const right_Eye = pose.keypoints[2].position;
    const left_Shoulder = pose.keypoints[5].position;
    const right_Shoulder = pose.keypoints[6].position;
    const left_Elbow = pose.keypoints[7].position;
    const right_Elbow = pose.keypoints[8].position;
    const left_Wrist = pose.keypoints[9].position;
    const right_Wrist = pose.keypoints[10].position;

    if (
      (right_Eye.x < left_Wrist.x &&
        right_Elbow.y > right_Shoulder.y &&
        right_Elbow.y > head.y &&
        head.y > left_Wrist.y) ||
      (left_Eye.x > right_Wrist.x &&
        left_Elbow.y > left_Shoulder.y &&
        left_Elbow.y > head.y &&
        head.y > right_Wrist.y)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <SideNeckStretchingWrap>
      <div className='count-down'>Count Down : {poseTime} s</div>
      <div className='maintain-time'>Maintain Time : {bestPerform} s</div>
      <canvas ref={canvasRef} className='canvas' />
      <Webcam ref={webcamRef} className='webcam' />
    </SideNeckStretchingWrap>
  );
};

export default SideNeckStretching;

const SideNeckStretchingWrap = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
  height: 100%;

  & div {
    margin-bottom: 5px;
  }

  .count-down {
    background-color: #b1edeb;
    padding: 5px;
    border-radius: 10px;
    font-size: 20px;
  }

  .maintain-time {
    background-color: #4485f4;
    color: #fff;
    padding: 5px;
    border-radius: 10px;
    font-size: 25px;
  }
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
