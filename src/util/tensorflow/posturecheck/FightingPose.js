const FightingPose = (pose) => {
  const head = pose.keypoints[0].position;
  const left_Shoulder = pose.keypoints[5].position;
  const right_Shoulder = pose.keypoints[6].position;
  const left_Elbow = pose.keypoints[7].position;
  const right_Elbow = pose.keypoints[8].position;
  const left_Wrist = pose.keypoints[9].position;
  const right_Wrist = pose.keypoints[10].position;

  if (right_Shoulder.y > right_Wrist.y && left_Shoulder.y > left_Wrist.y) {
    if (right_Elbow.y > right_Wrist.y && left_Elbow.y > left_Wrist.y) {
      if (right_Shoulder.x < right_Wrist.x && left_Shoulder.x > left_Wrist.x) {
        if (
          head.y < right_Elbow.y &&
          right_Wrist.y &&
          left_Elbow.y &&
          left_Wrist.y
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
  } else {
    return false;
  }
};

export default FightingPose;
