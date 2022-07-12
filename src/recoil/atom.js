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
    runtime: '0',
    warnings: '0',
  },
});

export { userState, conditionState };
