import { atom } from 'recoil';

const userState = atom({
  key: 'user',
  default: {
    displayName: '',
    email: '',
  },
});

export default userState;
