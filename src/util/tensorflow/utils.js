import * as poseNet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

const trueColor = '#23ffc4';
const falseColor = '#dcf7ff';
const color = '#948df9';
const lineWidth = 7;

function toTuple({ y, x }) {
  return [y, x];
}

export function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function drawSkeleton(keypoints, minConfidence, ctx, flag, scale = 1) {
  const adjacentKeyPoints = poseNet.getAdjacentKeyPoints(
    keypoints,
    minConfidence,
    flag,
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx,
    );
  });
}

export function drawKeyPoints(keypoints, minConfidence, ctx, flag, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 6, flag ? trueColor : falseColor);
  }
}
