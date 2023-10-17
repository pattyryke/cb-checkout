import React from 'react';
import { Button, Container } from '@mui/material';

const Login = () => {
  const handleLogin = async () => {
    try {
      window.location.href = 'http://localhost:3000/auth/google/login';
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <Container 
      fixed
      sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
      }}
    >
      <Button 
        variant='contained'
        size='small' 
        onClick={handleLogin}
      >Login with Google
      </Button>
    </Container>
    );
};

export default Login;
