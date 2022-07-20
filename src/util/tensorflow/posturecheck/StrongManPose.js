import HandsUpPose from './HandsUpPose';

const StrongManPose = (pose) => {
  const head = pose.keypoints[0].position;
  const left_Elbow = pose.keypoints[7].position;
  const right_Elbow = pose.keypoints[8].position;
  const left_Wrist = pose.keypoints[9].position;
  const right_Wrist = pose.keypoints[10].position;

  if (HandsUpPose(pose)) {
    if (right_Wrist.y > head.y && left_Wrist.y > head.y) {
      if (right_Elbow.y > right_Wrist.y && left_Elbow.y > left_Wrist.y) {
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

export default StrongManPose;
