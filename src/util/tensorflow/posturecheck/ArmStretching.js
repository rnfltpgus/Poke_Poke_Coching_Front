const ArmStretching = (pose) => {
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

export default ArmStretching;
