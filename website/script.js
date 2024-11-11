// Description: Client-side functionality of Express to connect to database.

import React, { useState, useEffect } from 'react';

const BillData = () => {
  // Set up state to store the fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_API_URL}/data`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // Store the data in state
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means it runs once when the component mounts

  // Return JSX to render data (error handling!)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Bill Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default BillData;