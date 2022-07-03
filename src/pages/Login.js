import React from 'react';

import { signInWithGoogle } from '../auth/firebase';
import { GoogleButton } from 'react-google-button';

const Login = () => {
  return (
    <div>
      <GoogleButton onClick={signInWithGoogle} />
    </div>
  );
};

export default Login;
