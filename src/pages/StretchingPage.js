import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';

import { very } from '../util/music/index';
import DropDown from '../components/DropDown';
import { poseImage } from '../util/images/index';
import { drawKeyPoints, drawSkeleton } from '../util/tensorflow/utils';

import styled from 'styled-components';

let poseList = ['TurtleNeck', 'Arm', 'SideNeck'];
let flag = false;
let interval;

const TurtleNeckStretching = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);
  const [currentPose, setCurrentPose] = useState('TurtleNeck');

  useEffect(() => {
    runPoseNet();
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);

    return () => clearInterval(interval);
  }, [currentPose]);

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

    interval = setInterval(() => {
      poseDetect(poseNetLoad, countAudio);
    }, 1000);
  };

  const keepPosture = [];

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
      let correctPosture = false;
      const studyModeSwitchPage = fightingPoseSwitchPage(pose);

      if (currentPose === 'TurtleNeck') {
        correctPosture = checkTurtleNeckStretching(pose);
      }

      if (currentPose === 'Arm') {
        correctPosture = checkArmStretching(pose);
      }

      if (currentPose === 'SideNeck') {
        correctPosture = checkSideNeckStretching(pose);
      }

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

      if (studyModeSwitchPage) {
        if (keepPosture.length === 3) {
          countAudio.pause();
          navigate('/studypage');
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

  const checkTurtleNeckStretching = (pose) => {
    const head = pose.keypoints[0].position;
    const left_Shoulder = pose.keypoints[5].position;
    const right_Shoulder = pose.keypoints[6].position;
    const left_Elbow = pose.keypoints[7].position;
    const right_Elbow = pose.keypoints[8].position;
    const left_Wrist = pose.keypoints[9].position;
    const right_Wrist = pose.keypoints[10].position;

    if (
      right_Wrist.y > right_Shoulder.y &&
      left_Wrist.y > left_Shoulder.y &&
      right_Elbow.x < head.x &&
      head.x < left_Elbow.x
    ) {
      const shoulder = left_Shoulder.x - right_Shoulder.x;

      if (
        shoulder > right_Shoulder.x - right_Elbow.x &&
        shoulder > left_Elbow.x - left_Shoulder.x
      ) {
        if (
          left_Wrist.x > left_Shoulder.x &&
          right_Shoulder.x > right_Wrist.x
        ) {
          if (left_Elbow.y > left_Wrist.y && right_Elbow.y > right_Wrist.y) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const fightingPoseSwitchPage = (pose) => {
    const head = pose.keypoints[0].position;
    const left_Elbow = pose.keypoints[7].position;
    const right_Elbow = pose.keypoints[8].position;
    const left_Wrist = pose.keypoints[9].position;
    const right_Wrist = pose.keypoints[10].position;

    if (
      head.y < right_Wrist.y < right_Elbow.y &&
      head.y < left_Wrist.y < left_Elbow.y
    ) {
      if (
        (right_Wrist.y && left_Wrist.y) < head.y &&
        (left_Elbow.y && right_Elbow.y) > head.y
      ) {
        keepPosture.push(true);

        return true;
      } else {
        keepPosture.pop();

        return false;
      }
    } else {
      return false;
    }
  };

  const checkArmStretching = (pose) => {
    const left_Shoulder = pose.keypoints[5].position;
    const right_Shoulder = pose.keypoints[6].position;
    const left_Elbow = pose.keypoints[7].position;
    const right_Elbow = pose.keypoints[8].position;
    const left_Wrist = pose.keypoints[9].position;
    const right_Wrist = pose.keypoints[10].position;

    if (right_Shoulder.x > left_Wrist.x || left_Shoulder.x < right_Wrist.x) {
      const shoulderLength = left_Shoulder.x - right_Shoulder.x;

      if (
        shoulderLength > right_Shoulder.x - left_Elbow.x &&
        shoulderLength > right_Elbow.x - left_Shoulder.x
      ) {
        if (
          (right_Shoulder.y > right_Wrist.y &&
            right_Wrist.y < left_Elbow.y &&
            left_Elbow.y > right_Elbow.y &&
            right_Wrist.y) ||
          (left_Shoulder.y > left_Wrist.y &&
            left_Wrist.y < right_Elbow.y &&
            right_Elbow.y > left_Elbow.y &&
            left_Wrist.y)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
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
    <TurtleNeckStretchingWrap>
      <div className='stretching-container'>
        <div className='stretching-ex'>
          <DropDown
            poseList={poseList}
            currentPose={currentPose}
            setCurrentPose={setCurrentPose}
          />
          <img
            src={poseImage[currentPose]}
            alt='stretching-pose-imag'
            className='pose-image-gif'
          />
        </div>
        <div className='stretching-mode'>
          <div className='count-down'>Count Down : {poseTime} s</div>
          <div className='max-maintain-time'>
            Max Maintain Time : {bestPerform} s
          </div>
          <Webcam ref={webcamRef} className='webcam' />
          <canvas ref={canvasRef} className='canvas' />
        </div>
      </div>
      <div className='text-area-description'>
        두 팔을 들어 120'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔을
        안쪽으로 당기는 느낌을 받으며 당겨줍니다. 그 자세로 최소 10초 이상
        유지합니다.
      </div>
    </TurtleNeckStretchingWrap>
  );
};

export default TurtleNeckStretching;

const TurtleNeckStretchingWrap = styled.div`
  div {
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    color: black;
    flex: 1;
    box-sizing: border-box;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .stretching-container {
    border-radius: 10px;
    width: 95%;
    margin: 30px auto 10px auto;
    gap: 2rem;
    display: flex;
  }

  .stretching-ex {
    background-color: #dcf7ff;
    background-size: cover;
    height: 700px;
  }

  .stretching-mode {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .count-down {
    background-color: #b1edeb;
    padding: 5px;
    border-radius: 10px;
    font-size: 20px;
  }

  .max-maintain-time {
    background-color: #4485f4;
    color: #fff;
    padding: 5px;
    border-radius: 10px;
    font-size: 25px;
  }

  .webcam {
    position: absolute;
    top: 105px;
    left: 0;
    width: 100%;
    height: 600px;
    border-radius: 10px;
  }

  .canvas {
    z-index: 10;
    position: absolute;
    top: 105px;
    left: 0;
    width: 100%;
    height: 600px;
  }

  .pose-image-gif {
    width: 95%;
    height: 630px;
    border-radius: 10px;
  }

  .text-area-description {
    margin: auto 40px;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: #f8e9ed;
  }
`;
