import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import CenterBox from './components/CenterBox';
import MyResponsivePie from './components/MyResponsivePie';
import MyResponsiveNetwork from './components/MyResponsiveNetwork';
import MyResponsiveBar from './components/MyResponsiveBar';
import FadeIn from './components/FadeIn'; // Import FadeIn component
import initialData from './Network.json'; // Import JSON data file
import ClientParent from './components/ClientParent';


function App() {
  const [displayText, setDisplayText] = useState('');
  const [showPieGraph, setShowPieGraph] = useState(false); // State for controlling graph display
  const [showNetGraph, setShowNetGraph] = useState(false); // State for controlling graph display
  const [showBarGraph, setShowBarGraph] = useState(false); // State for controlling graph display
  const [showClient, setShowClient] = useState(false);
  const [isIn, setIsIn] = useState(false); // State for controlling fade-in animation
  const [data, setData] = useState([]);
  



  const handleDataUpdate = (clients) => {

    const formData = clients.map((client)=> ({ id: client.client, value: 0 }));
    setData(formData);
  };

  const [netData, setNetData] = useState(initialData);
  const [barData, setBarData] = useState([
    {
      country: 'Saftey',
      Accepted: 70,
      Lost: 30,
    },
    {
      country: 'Security',
      Accepted: 60,
      Lost: 40,
    },
    {
      country: 'Server',
      Accepted: 80,
      Lost: 20,
    },
  ]);

  

  const [centerText, setCenterText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      fetchTotalPackets();
      fetchBarData();
 

    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [data]); // Run whenever data changes

  /*const handleClick = (index) => {
    // setShowPieGraph(true);
    // setRandomIndex(index);
  };
*/
  const PieChartClick = () => {
    setShowPieGraph(!showPieGraph);
    setIsIn(true); // Set isIn to true when PieChart button is clicked
  };
  const networkClick = () => {
    setShowNetGraph(!showNetGraph);
  };
  const barClick = () => {
    setShowBarGraph(!showBarGraph);
  };
  const handleButtonClick = () => {
    setShowClient(!showClient);
  };

 const handleStartStop= async(e) =>{
    const payload = {
      SimulationRate: 5
    }
    
    try {                                               
      const response = await fetch('http://0.0.0.0:2000/runSimulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to add start Simulation');
      }
    } catch (error) {
      console.error('Error starting Simulation:', error);
    }
  };

  const fetchData = () => {
    setIsIn(true);
    Promise.all(
      data.map((item) => {
        const url = `http://0.0.0.0:3000/packets/${item.client}`;
        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response not okay.');
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error('Response not in JSON format.');
            }
            return response.json();
          })
          .then((packet) => {
            return { ...item, value: packet.value }; // Update the value for the corresponding client
          });
      })
    )
    .then((updateData)=>{
      setData(updateData);
    })
    .catch((error)=>{
      console.error('Error:', error.message);
      setDisplayText('Error fetching data.');
    });
  };

  const fetchTotalPackets = () => {
    const url = "http://0.0.0.0:3000/totalPackets";

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
  
  const fetchBarData = () => {
    const url = "http://0.0.0.0:3000/packets";

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
        setBarData([
          { country: 'Safety', Accepted: packet.safety, Lost: 5 },
          { country: 'Security', Accepted: packet.security, Lost: 5 },
          { country: 'Server', Accepted: packet.server, Lost: 5},
        ]);
      })
      .catch(error => {
        console.error('Error: ', error.message);
        setDisplayText('Error fetching data'); // Display error message
      });
  };


  return (

    <div>
      <div>
        {showClient && <ClientParent onDataUpdate={handleDataUpdate} />}
      </div>
      <CenterBox text={displayText}>
        <p>Packet Display</p>
      </CenterBox>

      {/* Wrap MyResponsivePie component with FadeIn component */}
      <FadeIn in={isIn}>
        <div className="MyResponsivePie">
          {showPieGraph && <MyResponsivePie data={data} centerText={centerText} />}
          {showNetGraph && <MyResponsiveNetwork data={netData} />}
          {showBarGraph && <MyResponsiveBar data={barData} />}
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
        <Button onClick={() => barClick()}>Stacked Bar</Button>
        <Button onClick={() => handleStartStop()}>Start/Stop Simulation</Button>
        <Button onClick={() => handleButtonClick()}>Add Client</Button>
      </div>
    </div>

  );
}

export default App;
