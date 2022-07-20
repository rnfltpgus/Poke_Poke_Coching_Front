import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';

import DropDown from '../components/dropdown/DropDown';
import TurtleNeckStretching from '../util/tensorflow/posturecheck/TurtleNeckStretching';
import ArmStretching from '../util/tensorflow/posturecheck/ArmStretching';
import SideNeckStretching from '../util/tensorflow/posturecheck/SideNeckStretching';
import drawCanvas from '../util/helpers/drawCanvas';
import { poseImage } from '../util/images/index';
import { poseInstructions } from '../util/data';
import { okGood } from '../util/music/index';

import styled from 'styled-components';

let poseList = ['TurtleNeck', 'Arm', 'SideNeck'];
let flag = false;
let interval;

const StretchingPage = () => {
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
    const countAudio = new Audio(okGood);

    interval = setInterval(() => {
      poseDetect(poseNetLoad, countAudio);
    }, 100);
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
      const studyModeSwitchPages = switchPage(pose);
      let isCorrectPosture = false;

      if (currentPose === 'TurtleNeck') {
        isCorrectPosture = TurtleNeckStretching(pose);
      }

      if (currentPose === 'Arm') {
        isCorrectPosture = ArmStretching(pose);
      }

      if (currentPose === 'SideNeck') {
        isCorrectPosture = SideNeckStretching(pose);
      }

      if (flag === null) {
        return;
      }

      if (isCorrectPosture === true && pose.score > 0.6) {
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

      if (studyModeSwitchPages) {
        if (keepPosture.length === 30) {
          countAudio.pause();
          navigate('/studypage');
        }
      }

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef, flag);
    }
  };

  const switchPage = (pose) => {
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

  return (
    <StretchingPageWrap>
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
          <Webcam mirrored={true} ref={webcamRef} className='webcam' />
          <canvas ref={canvasRef} className='canvas' />
        </div>
      </div>
      <div className='text-area-description'>
        {poseInstructions[currentPose]}
      </div>
    </StretchingPageWrap>
  );
};

export default StretchingPage;

const StretchingPageWrap = styled.div`
  div {
    line-height: 5vh;
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
    height: 78.7vh;
  }

  .stretching-mode {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    background-color: #dcf7ff;
    background-size: cover;
    height: 78.7vh;
  }

  .count-down {
    background-color: #b1edeb;
    padding: 0.6vh;
    border-radius: 10px;
    font-size: 1.7rem;
    width: 45vw;
    margin: 0.8rem auto;
  }

  .max-maintain-time {
    background-color: #4485f4;
    color: #fff;
    padding: 1vh;
    border-radius: 10px;
    font-size: 2rem;
    width: 45vw;
    margin: 1rem auto;
  }

  .webcam {
    position: absolute;
    right: 1vw;
    width: 44.8vw;
    height: 60vh;
  }

  .canvas {
    z-index: 10;
    position: absolute;
    right: 1vw;
    width: 44.8vw;
    height: 60vh;
    transform: rotateY(180deg);
  }

  .pose-image-gif {
    width: 95%;
    height: 68.6vh;
    margin-top: 0.6vh;
    border-radius: 10px;
  }

  .text-area-description {
    margin: auto 3rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: #f8e9ed;
    font-size: 1.5rem;
  }
`;
