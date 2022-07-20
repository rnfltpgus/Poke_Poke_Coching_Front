const HandsUpPose = (pose) => {
  const head = pose.keypoints[0].position;
  const left_Shoulder = pose.keypoints[5].position;
  const right_Shoulder = pose.keypoints[6].position;
  const left_Elbow = pose.keypoints[7].position;
  const right_Elbow = pose.keypoints[8].position;

  if (
    right_Elbow.y < right_Shoulder.y &&
    left_Elbow.y < left_Shoulder.y &&
    right_Elbow.x < head.x &&
    head.x < left_Elbow.x
  ) {
    return true;
  } else {
    return false;
  }
};

export default HandsUpPose;
