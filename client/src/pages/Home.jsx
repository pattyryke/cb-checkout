// Home.jsx
import React from 'react';
import GetNameForm from '../components/forms/GetNameForm';

export default function Home() {
  return (
    <div id='homepage-container'>
      <div className='row-container'>
        <GetNameForm />
      </div>
    </div>
  );
}
