import React, { useRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { drawKeyPoints, drawSkeleton } from '../util/utils';

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load poseNet
  // 실제로 여기서 전체의 기능을 로드하는 부분
  const runPoseNet = async () => {
    const poseNetLoad = await posenet.load({
      inputResolution: { width: 640, height: 480 }, // 입력해상도
      scale: 0.6, // 수가 짦을 수록 빠르게 결과를 엊을수 있음
    });

    setInterval(() => {
      poseDetect(poseNetLoad);
    }, 100);
  };

  // 실제로 감시를 하는 부분의 function
  const poseDetect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      console.log('🔥 현재 좌표값', pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const context = canvas.current.getContext('2d');
    canvas.current.video = video;
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeyPoints(pose.keypoints, 0.5, context);
    drawSkeleton(pose.keypoints, 0.5, context);
    // 원하는 부위의 이름을 찾아서 폴문으로 돌수있다.
    // ex) for(let i = 0; i < pose.keypoints.length; i++)
  };

  runPoseNet();

  return (
    <div className='Camera'>
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 600,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 600,
        }}
      />
    </div>
  );
}

export default Camera;
