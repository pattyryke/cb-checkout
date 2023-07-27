import React from 'react';
import Layout from './elements/Layout';
import RoutesElement from './elements/Routes';
import LockCheckButton from './elements/LockCheckButton';
import Login from './elements/google/login/Login';

export function App() {

  return (
    <div className="App">
      <div id='top-bar'>
        <Login />
        <LockCheckButton />
        <div className='row-container'>
          <h1 id='title'>
            Patrick's Check-in/Check-out Website
          </h1>
          <RoutesElement />
          <Layout />
        </div>
      </div>
    </div>
  );
}

export default App;
