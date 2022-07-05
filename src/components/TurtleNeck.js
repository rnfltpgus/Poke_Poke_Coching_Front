import React, { useRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { drawKeyPoints, drawSkeleton } from '../util/utils';

import styled from 'styled-components';

const TurtleNeck = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  let pose_status = 2;
  let keep_time = [0, 0, 0];
  let result_message = '';

  const runPoseNet = async () => {
    const poseNetLoad = await posenet.load({
      scale: 0.6,
    });

    setInterval(() => {
      poseDetect(poseNetLoad);
      window.parent.postMessage({ message: pose_count }, '*');
    }, 100);
  };

  const poseDetect = async (poseNetLoad) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await poseNetLoad.estimateSinglePose(video);
      // console.log('🔥 현재 좌표값', pose);
      check_Pose2(pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const context = canvas.current.getContext('2d');
    canvas.current.video = video;
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeyPoints(pose.keypoints, 0.6, context);
    drawSkeleton(pose.keypoints, 0.6, context);
  };

  let count_time = setInterval(function () {
    if (pose_count >= 7) {
      clearInterval(count_time);
      result_message = 'Success';
      window.parent.postMessage({ message: result_message }, '*');
    } else if (keep_time[2] >= 30) {
      clearInterval(count_time);

      result_message = 'Fail';
      window.parent.postMessage({ message: result_message }, '*');
    }
    keep_time[2]++;
  }, 1000);

  //Stretch - Stand - HandsUp - Stand: 1회
  let pose_count = 0;
  let tmp = [0, 0];

  function check_Pose2(pose) {
    if (check_Stand(pose)) {
      pose_status = 2;
      if (tmp[0] == 1 && tmp[1] == 1) {
        tmp[0] = tmp[1] = 0;
        pose_count++;
        window.parent.postMessage({ message: pose_count }, '*');
      }
    } else if (check_Stretch(pose)) {
      tmp[0] = 1;
      pose_status = 0;
    } else if (check_HandsUp(pose) && tmp[0] == 1) {
      tmp[1] = 1;
      pose_status = 1;
    }
    if (tmp[0] == 0 && tmp[1] == 0 && tmp[2] == 0 && check_Stretch(pose)) {
      tmp[0] = 1;
    } else if (tmp[0] == 1 && tmp[1] == 0 && tmp[2] == 0 && check_Stand(pose)) {
      tmp[1] = 1;
    } else if (
      tmp[0] == 1 &&
      tmp[1] == 1 &&
      tmp[2] == 0 &&
      check_HandsUp(pose)
    ) {
      tmp[2] = 1;
    } else if (tmp[0] == 1 && tmp[1] == 1 && tmp[2] == 1 && check_Stand(pose)) {
      tmp[0] = tmp[1] = tmp[2] = 0;
      pose_count++;
      result_label = pose_count + '회';
    }
  }

  function check_HandsUp(pose) {
    const head = pose.keypoints[0].position; //머리(코)
    const rw = pose.keypoints[10].position; //오른쪽 손목
    const re = pose.keypoints[8].position; //오른쪽 팔꿈치
    const rs = pose.keypoints[6].position; //오른쪽 어깨
    const lw = pose.keypoints[9].position; //왼쪽 손목
    const le = pose.keypoints[7].position; //왼쪽 팔꿈치
    const ls = pose.keypoints[5].position; //왼쪽 어깨

    //팔꿈치가 어깨보다 높을 것, 양 팔꿈치 사이에 머리가 위치할 것
    if (re.y < rs.y && le.y < ls.y && re.x < head.x && head.x < le.x) {
      //어깨 사이의 거리보다 팔꿈치/어깨 사이의 거리가 짧을 것
      const shoulder = ls.x - rs.x;
      if (shoulder > rs.x - re.x && shoulder > le.x - ls.x) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function check_Stretch(pose) {
    const head = pose.keypoints[0].position; //머리(코)
    const rw = pose.keypoints[10].position; //오른쪽 손목
    const re = pose.keypoints[8].position; //오른쪽 팔꿈치
    const rs = pose.keypoints[6].position; //오른쪽 어깨
    const lw = pose.keypoints[9].position; //왼쪽 손목
    const le = pose.keypoints[7].position; //왼쪽 팔꿈치
    const ls = pose.keypoints[5].position; //왼쪽 어깨
    const rb = pose.keypoints[12].position; //body(오른쪽 골반)
    const lb = pose.keypoints[11].position; //body(왼쪽 골반)

    //팔이 머리보단 낮고, 골반보다 높을 것
    if (head.y < re.y && head.y < le.y && re.y < rb.y && le.y < lb.y) {
      if (
        re.x < rs.x &&
        rs.x < head.x &&
        head.x < ls.x &&
        ls.x < le.x &&
        (rw.x < re.x || le.x < lw.x)
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  function check_Stand(pose) {
    const head = pose.keypoints[0].position; //머리(코)
    const rw = pose.keypoints[10].position; //오른쪽 손목
    const re = pose.keypoints[8].position; //오른쪽 팔꿈치
    const rs = pose.keypoints[6].position; //오른쪽 어깨
    const lw = pose.keypoints[9].position; //왼쪽 손목
    const le = pose.keypoints[7].position; //왼쪽 팔꿈치
    const ls = pose.keypoints[5].position; //왼쪽 어깨
    const rb = pose.keypoints[12].position; //body(오른쪽 골반)
    const lb = pose.keypoints[11].position; //body(왼쪽 골반)

    //머리 - 어깨 - 팔꿈치 - 골반 - 손목 (y좌표)
    if (
      head.y < rs.y &&
      head.y < ls.y &&
      rs.y < re.y &&
      ls.y < le.y &&
      re.y < rw.y &&
      le.y < lw.y &&
      (rb.y < rw.y || lb.y < lw.y)
    ) {
      //어깨의 길이보다 손목/골반 사이의 길이가 작을 것
      const shoulder = ls.x - rs.x;
      if (shoulder > rb.x - rw.x || shoulder > lw.x - lb.x) {
        return true;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  runPoseNet();

  return (
    <TurtleNeckWrap>
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
