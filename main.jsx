import React, { useState, useEffect } from 'react';

function App() {
  const [runData, setRunData] = useState([]);
  const fetchRunData = () => {
    // Make GET request to the API
    fetch('http://localhost:8080/runData')
      .then(response => response.json())
      .then(data => {
        // Update state with fetched data
        setRunData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchRunData();
  }, []); // Empty dependency array ensures this effect runs only once on mount


  return (
    <div>
      <h1>Run Data</h1>
      <ul>
        {runData.map((item, index) => (
          <li key={index}>
            Packets: {item.packets}, Transmitting: {item.transmitting ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
