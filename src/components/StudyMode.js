import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';

import { drawKeyPoints, drawSkeleton } from '../util/helpers/utils';

import styled from 'styled-components';

function StudyMode() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runPoseNet = async () => {
    const poseNetLoad = await poseNet.load({
      scale: 0.8,
    });

    setInterval(() => {
      poseDetect(poseNetLoad);
    }, 100);
  };

  const poseDetect = async (poseNetLoad) => {
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

  runPoseNet();

  return (
    <TurtleNeckWrap>
      <Webcam ref={webcamRef} className='webcam' />
      <canvas ref={canvasRef} className='canvas' />
    </TurtleNeckWrap>
  );
}

export default StudyMode;

const TurtleNeckWrap = styled.div`
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
    left: 0;
    width: 100%;
    height: 600px;
  }
  .canvas {
    position: absolute;
    left: 0;
    width: 100%;
    height: 600px;
  }
`;
