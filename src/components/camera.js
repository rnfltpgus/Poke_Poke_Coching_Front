import React, { useRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { drawKeyPoints, drawSkeleton } from '../util/utils';

import styled from 'styled-components';

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load poseNet
  // 실제로 여기서 전체의 기능을 로드하는 부분
  const runPoseNet = async () => {
    const poseNetLoad = await posenet.load({
      // inputResolution: { width: 640, height: 600 }, // 입력해상도
      scale: 0.6, // 수가 짦을 수록 빠르게 결과를 엊을수 있음
    });

    setInterval(() => {
      poseDetect(poseNetLoad);
    }, 100);
  };

  // 실제로 감시를 하는 부분의 function
  const poseDetect = async (poseNetLoad) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const { videoWidth, videoHeight } = webcamRef.current.video;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await poseNetLoad.estimateSinglePose(video);
      console.log('🔥 현재 좌표값', pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const context = canvas.current.getContext('2d');
    canvas.current.video = video;
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    // 0.6 이런거가 정확도를 개선할수  있느 수치, 작을수록 빠르게 감지하고 정확도가 떨어짐
    drawKeyPoints(pose.keypoints, 0.6, context);
    drawSkeleton(pose.keypoints, 0.6, context);
    // 원하는 부위의 이름을 찾아서 폴문으로 돌수있다.
    // ex) for(let i = 0; i < pose.keypoints.length; i++)
  };

  runPoseNet();

  return (
    <CameraWrap>
      <Webcam ref={webcamRef} className='webcam' />
      <canvas ref={canvasRef} className='canvas' />
    </CameraWrap>
  );
}

export default Camera;

const CameraWrap = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
  width: 100%;
  height: 100%;

  .webcam {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
