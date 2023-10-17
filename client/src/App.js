import React, { useState, useEffect } from 'react';
import RoutesElement from './elements/Routes';
import NavBar from './elements/navigation-bar/NavBar';
import { Container } from '@mui/material';
import TitleBar from './elements/title-bar/TitleBar';

export function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataParam = urlParams.get('user');
    if (userDataParam) {
      const parsedUserData = JSON.parse(decodeURIComponent(userDataParam));
      setUserData(parsedUserData);
    }
  }, []);

	return (
		<Container 
      maxWidth="xl"
    >
      <TitleBar />
			<NavBar userData={userData}/>

			<Container 
        id="main-container"
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
				<Container 
          id="content-container"
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >

					<RoutesElement />
				
        </Container>
			</Container>
		</Container>
	);
}

export default App;
