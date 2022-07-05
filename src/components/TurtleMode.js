import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

import { drawKeyPoints, drawSkeleton } from '../util/utils';
import { count } from '../util/music/index';
import Instructions from '../../components/Instrctions/Instructions';

import styled from 'styled-components';

const TurtleMode = () => {
  return <CameraWrap></CameraWrap>;
};

export default TurtleMode;

const CameraWrap = styled.div``;
