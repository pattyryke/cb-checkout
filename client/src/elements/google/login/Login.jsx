import React from 'react';

const Login = () => {

  const openAuthURL = () => {
    console.log('You pressed the auth button');
    window.location.href = `http://localhost:3000/auth/google/login`;
  };

  return (
      <button onClick={openAuthURL}>Login with Google</button>
  );
};

export default Login;
