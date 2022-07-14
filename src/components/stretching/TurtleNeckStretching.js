import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as poseNet from '@tensorflow-models/posenet';

import { very } from '../../util/music/index';

import styled from 'styled-components';

let flag = false;
let poseList = ['TurtleNeck', 'Arm', 'SideNeck'];

const TurtleNeckStretching = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);
  const [currentPose, setCurrentPose] = useState('TurtleNeck');

  useEffect(() => {
    runPoseNet();
  }, []);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
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

    setInterval(() => {
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
      const correctPosture = checkTurtleNeckStretching(pose);
      const studyModeSwitchPage = fightingPoseSwitchPage(pose);

      if (flag === null) {
        return;
      }

      if (correctPosture === true && pose.score > 0.65) {
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

      // if (studyModeSwitchPage) {
      //   if (keepPosture.length === 3) {
      //     countAudio.pause();
      //     navigate('/studypage');
      //   }
      // }
    }
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
          left_Wrist.x > left_Shoulder.x ||
          right_Shoulder.x < right_Wrist.x
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

  return (
    <TurtleNeckStretchingWrap>
      <div className='count-down'>Count Down : {poseTime} s</div>
      <div className='maintain-time'>Maintain Time : {bestPerform} s</div>
      <Webcam ref={webcamRef} className='webcam' />
    </TurtleNeckStretchingWrap>
  );
};

export default TurtleNeckStretching;

const TurtleNeckStretchingWrap = styled.div`
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
