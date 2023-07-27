import React, { useState } from 'react';
import axios from 'axios';

export default function Account() {
  const [accountDetails, setAccountDetails] = useState('');

  const fetchDetails = async () => {
    const url = 'http://localhost:3000/google/account';
    const response = await axios.get(url);
    return response.data;
  };

  const handleClick = async () => {
    try {
      const response = await fetchDetails();
      console.log('CLICK RESPONSE:', response);

      setAccountDetails(JSON.stringify(response, null, 2)); // Format the JSON for readability
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  return (
    <div id='account-details'>
      <h1>This is the current account's information:</h1>
      <button onClick={handleClick}>Get Account Details</button>
      <pre>
        <code>{accountDetails}</code>
      </pre>
    </div>
  );
}
