import React, { useState, useEffect } from 'react';
import RoutesElement from './hooks/Routes';
import { Container } from '@mui/material';
import axios from 'axios';
import NavigationBar from './components/NavigationBar';
import Title from './components/Title';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUser = async () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/google/check/user',
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setIsLoggedIn(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Container maxWidth='xl'>
      <Title />
      <NavigationBar isLoggedIn={isLoggedIn} />

      <Container
        id='main-container'
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Container
          id='content-container'
          maxWidth='lg'
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <RoutesElement />
        </Container>
      </Container>
    </Container>
  );
}

export default App;
