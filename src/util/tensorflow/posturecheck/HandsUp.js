const HandsUp = (pose) => {
  const head = pose.keypoints[0].position;
  const left_Shoulder = pose.keypoints[5].position;
  const right_Shoulder = pose.keypoints[6].position;
  const left_Elbow = pose.keypoints[7].position;
  const right_Elbow = pose.keypoints[8].position;
  const left_Wrist = pose.keypoints[9].position;
  const right_Wrist = pose.keypoints[10].position;

  if (
    right_Elbow.y < right_Shoulder.y &&
    left_Elbow.y < left_Shoulder.y &&
    right_Elbow.x < head.x &&
    head.x < left_Elbow.x
  ) {
    if (right_Wrist.y < head.y && left_Wrist.y < head.y) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default HandsUp;
