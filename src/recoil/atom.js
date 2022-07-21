import { atom } from 'recoil';

const userState = atom({
  key: 'user',
  default: {
    displayName: '',
    email: '',
  },
});

const conditionState = atom({
  key: 'condition',
  default: {
    warnings: 0,
    studyModeOn: false,
  },
});

const timeState = atom({
  key: 'studyTime',
  default: 0,
});

export { userState, conditionState, timeState };
