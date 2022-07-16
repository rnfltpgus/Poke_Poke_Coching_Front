const SideNeckStretching = (pose) => {
  const head = pose.keypoints[0].position;
  const left_Shoulder = pose.keypoints[5].position;
  const right_Shoulder = pose.keypoints[6].position;
  const left_Elbow = pose.keypoints[7].position;
  const right_Elbow = pose.keypoints[8].position;
  const left_Wrist = pose.keypoints[9].position;
  const right_Wrist = pose.keypoints[10].position;

  if (
    right_Wrist.y > (left_Wrist.y && left_Elbow.y && left_Shoulder.y) ||
    left_Wrist.y > (right_Wrist.y && right_Elbow.y && right_Shoulder.y)
  ) {
    if (
      right_Elbow.y > (left_Wrist.y && left_Elbow.y && left_Shoulder.y) ||
      left_Elbow.y > (right_Wrist.y && right_Elbow.y && right_Shoulder.y)
    ) {
      if (
        (head.y > right_Wrist.y && right_Elbow.y < right_Shoulder.y) ||
        (head.y > left_Wrist.y && left_Elbow.y < left_Shoulder.y)
      ) {
        if (
          (left_Wrist.y < right_Shoulder.y && right_Wrist.x && right_Elbow.x) <
            right_Shoulder.x ||
          (right_Wrist.y < left_Shoulder.y && left_Wrist.x && left_Elbow.x) >
            left_Shoulder.x
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

export default SideNeckStretching;
