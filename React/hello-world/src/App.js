import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import CenterBox from './components/CenterBox';
import MyResponsivePie from './components/MyResponsivePie';
import MyResponsiveNetwork from './components/MyResponsiveNetwork';
import FadeIn from './components/FadeIn'; // Import FadeIn component
import jsonData from './Network.json'; // Import JSON data file


function App() {
  const [displayText, setDisplayText] = useState('');
  const [showPieGraph, setShowPieGraph] = useState(false); // State for controlling graph display
  const [showNetGraph, setShowNetGraph] = useState(false); // State for controlling graph display

  const [isIn, setIsIn] = useState(false); // State for controlling fade-in animation
  const [data, setData] = useState([
    { id: 'Saftey', value: 100 },
    { id: 'Security', value: 200 },
    { id: 'Server', value: 300 },
  ]);
  const initialData = jsonData;
  const [netData, setNetData] = useState(initialData);
  const [randomIndex, setRandomIndex] = useState(0);
  const [centerText, setCenterText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      fetchTotalPackets();

    }, 2); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [data]); // Run whenever data changes

  const handleClick = (index) => {
    // setShowPieGraph(true);
    // setRandomIndex(index);
  };

  const PieChartClick = () => {
    setShowPieGraph(!showPieGraph);
    setIsIn(true); // Set isIn to true when PieChart button is clicked
  };
  const networkClick = () => {
    setShowNetGraph(!showNetGraph);
  };

  const fetchData = () => {
    const url = "http://localhost:3000/packets";

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
          {showPieGraph && <MyResponsivePie data={data} centerText={centerText} />}
          {showNetGraph && <MyResponsiveNetwork data={netData} />}
          
        </div>
      </FadeIn>

      {/* Wrap MyResponsiveNetwork component with FadeIn component */}
      <FadeIn in={isIn}>
        <div className="MyResponsiveNetwork">
        
        </div>
      </FadeIn>

      <div className="container">
        {/* Update the state to show graph when button is clicked */}
        <Button onClick={() => fetchData()}>Fetch Data</Button>
        <Button onClick={() => PieChartClick()}>PieChart</Button>
        <Button onClick={() => networkClick()}>Network</Button>
        <Button onClick={() => handleClick(1)}>B</Button>
        <Button onClick={() => handleClick(2)}>C</Button>
        <Button onClick={() => handleClick(3)}>D</Button>
      </div>
    </div>

  );
}

export default App;
