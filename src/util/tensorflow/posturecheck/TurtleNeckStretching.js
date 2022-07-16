const TurtleNeckStretching = (pose) => {
  const head = pose.keypoints[0].position;
  const left_Ear = pose.keypoints[3].position;
  const right_Ear = pose.keypoints[4].position;
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
      if (left_Wrist.x > left_Shoulder.x && right_Shoulder.x > right_Wrist.x) {
        if (left_Elbow.y > left_Wrist.y && right_Elbow.y > right_Wrist.y) {
          if (head.y < left_Ear.y && right_Ear.y) {
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
  } else {
    return false;
  }
};

export default TurtleNeckStretching;
