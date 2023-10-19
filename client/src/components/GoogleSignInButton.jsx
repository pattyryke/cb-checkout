import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import axios from 'axios';

export default function GoogleSignInButton({isLoggedIn}) {
  const [buttonTitle, setButtonTitle] = useState('Login');
  const [buttonColor, setButtonColor] = useState('error');

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn === false) { 
      setButtonColor('error');
      setButtonTitle('Login'); 
    } else { 
      setButtonColor('success');
      setButtonTitle('Logout'); 
    }
  }, [isLoggedIn]);

  const logOut = async () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/google/logout'
    };
    try {
      await axios.request(options);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  const handleLogin = async () => {
    try {
      if (isLoggedIn === false) {
        window.location.href = 'http://localhost:3000/auth/google/login';
      } else {
        await logOut();
      }
    } catch (error) {
      console.error(error);
      throw error;
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
        color={buttonColor}
        onClick={handleLogin}
      >{buttonTitle}
      </Button>
    </Container>
    );
}
