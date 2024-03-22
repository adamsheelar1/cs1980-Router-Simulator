import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import CenterBox from './components/CenterBox';
import MyResponsivePie from './components/MyResponsivePie';
import FadeIn from './components/FadeIn'; // Import FadeIn component

function App() {
  const [displayText, setDisplayText] = useState('');
  const [showGraph, setShowGraph] = useState(false); // State for controlling graph display
  const [isIn, setIsIn] = useState(false); // State for controlling fade-in animation

  const handleClick = () => {
    setShowGraph(false);
    const buttonNumber = Math.floor(Math.random() * 6) + 1;
    setDisplayText(`Button clicked, random number is ${buttonNumber}`);
  };

  const PieChartClick = () => {
    setShowGraph(true);
    setIsIn(true); // Set isIn to true when PieChart button is clicked
  };

  const fetchData = () => {
    const url = "http://api:3000/packets";

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not in JSON format');
        }

        return response.json();
      })
      .then(json => {
        // Update the state to show the graph when data is fetched
        setShowGraph(true);
        setIsIn(true); // Set isIn to true when data is fetched
      })
      .catch(error => {
        console.error('Error: ', error.message);
        setDisplayText('Error fetching data'); // Display error message
      });
  };

  const data = [
    { id: 'A', value: 100 },
    { id: 'B', value: 200 },
    { id: 'C', value: 300 },
    { id: 'D', value: 100 },
  ];

  return (
    <div>
      <CenterBox text={displayText}>
        <p>This is some text in the center of the screen.</p>
      </CenterBox>

      {/* Wrap MyResponsivePie component with FadeIn component */}
      <FadeIn in={isIn}>
        <div className="MyResponsivePie">
          {showGraph && <MyResponsivePie data={data} />}
        </div>
      </FadeIn>

      <div className="container">
        {/* Update the state to show graph when button is clicked */}
        <Button onClick={() => fetchData()}>Fetch Data</Button>
        <Button onClick={PieChartClick}>PieChart</Button>
        <Button onClick={handleClick}>Third</Button>
        <Button onClick={handleClick}>Fourth</Button>
        <Button onClick={handleClick}>Fifth</Button>
        <Button onClick={handleClick}>Sixth</Button>
      </div>
    </div>
  );
}

export default App;
