import { drawKeyPoints, drawSkeleton } from '../tensorflow/utils';

const drawCanvas = (pose, video, videoWidth, videoHeight, canvas, flag) => {
  const minPartConfidence = 0.7;
  const context = canvas.current.getContext('2d');
  canvas.current.width = videoWidth;
  canvas.current.height = videoHeight;

  drawSkeleton(pose.keypoints, minPartConfidence, context, flag);
  drawKeyPoints(pose.keypoints, minPartConfidence, context, flag);
};

export default drawCanvas;
