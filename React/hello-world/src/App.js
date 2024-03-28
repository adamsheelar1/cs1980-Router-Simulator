import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import CenterBox from './components/CenterBox';
import MyResponsivePie from './components/MyResponsivePie';
import FadeIn from './components/FadeIn'; // Import FadeIn component


function App() {
  const [displayText, setDisplayText] = useState('');
  const [showGraph, setShowGraph] = useState(false); // State for controlling graph display
  const [isIn, setIsIn] = useState(false); // State for controlling fade-in animation
  const [data, setData] = useState([
    { id: 'Saftey', value: 100 },
    { id: 'Security', value: 200 },
    { id: 'Server', value: 300 },
  ]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [centerText, setCenterText] = useState(0);

  function updateData() {
    // Generate a random index to select a random element from the data array
    const newIndex = randomIndex
    // Update the value of the randomly selected element
    setData(prevData => {
      // Create a copy of the previous data array
      const newData = [...prevData];

      // Update the value of the selected element
      newData[newIndex] = {
        ...newData[newIndex],
        value: newData[newIndex].value + Math.floor(Math.random() * 10) + 1
      };

      return newData;
    });
  }

  function updateTotalPackets() {
    const newIndex = centerText
    // Update the value of the randomly selected element
    setCenterText(prevData => {
      // Create a copy of the previous data array
      const newData = fetchData;

      // // Update the value of the selected element
      // newData[newIndex] = {
      //     ...newData[newIndex],
      //     value: newData[newIndex].value + Math.floor(Math.random() * 10) + 1
      // };

      return newData;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateData();
      fetchData();
      fetchTotalPackets();

    }, 2); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [data]); // Run whenever data changes

  const handleClick = (index) => {
    setShowGraph(true);
    setRandomIndex(index);
  };

  const PieChartClick = () => {
    setShowGraph(!showGraph);
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
      .then(packet => {
        // Update the state to show the graph when data is fetched
        setIsIn(true); // Set isIn to true when data is fetched

        // Display the packet in a box or log it
        console.log('Packet:', packet); // Example: Log the packet
        // Update displayText state with packet content
        setDisplayText(JSON.stringify(packet, null, 2)); // Example: Display JSON stringified packet with indentation

        // Update the data state based on the packet
        setData([
          { id: 'Safety', value: packet.safety },
          { id: 'Security', value: packet.security },
          { id: 'Server', value: packet.server },
        ]);
      })
      .catch(error => {
        console.error('Error: ', error.message);
        setDisplayText('Error fetching data'); // Display error message
      });
  };

  const fetchTotalPackets = () => {
    const url = "http://localhost:3000/totalPackets";

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
      .then(packet => {
        // Update the state to show the graph when data is fetched
        setIsIn(true); // Set isIn to true when data is fetched

        // Display the packet in a box or log it
        console.log('Packet:', packet); // Example: Log the packet
        // Update displayText state with packet content
        // setDisplayText(JSON.stringify(packet, null, 2)); // Example: Display JSON stringified packet with indentation
        setCenterText(JSON.stringify(packet, null, 2));
      })
      .catch(error => {
        console.error('Error: ', error.message);
        setDisplayText('Error fetching data'); // Display error message
      });
  };


  return (

    <div>

      <CenterBox text={displayText}>
        <p>Packet Display</p>
      </CenterBox>

      {/* Wrap MyResponsivePie component with FadeIn component */}
      <FadeIn in={isIn}>
        <div className="MyResponsivePie">
          {showGraph && <MyResponsivePie data={data} centerText={centerText} />}
        </div>
      </FadeIn>

      <div className="container">
        {/* Update the state to show graph when button is clicked */}
        <Button onClick={() => fetchData()}>Fetch Data</Button>
        <Button onClick={PieChartClick}>PieChart</Button>
        <Button onClick={() => handleClick(0)}>A</Button>
        <Button onClick={() => handleClick(1)}>B</Button>
        <Button onClick={() => handleClick(2)}>C</Button>
        <Button onClick={() => handleClick(3)}>D</Button>
      </div>
    </div>

  );
}

export default App;
