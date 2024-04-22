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
   /*
    const formData = clients.map(client => ({
      id: client.Client,
      value: 0
    }));

    setData(formData);
    */
   
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
      fetchBarData();
      console.log("Data state:", data);

    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []); // Run whenever data changes

  /*const handleClick = (index) => {
    // setShowPieGraph(true);
    // setRandomIndex(index);
  };
*/
const fetchClientData = async () => {
  try {
    const response = await fetch('http://0.0.0.0:2000/getClients');
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const clients = await response.json();
    console.log(JSON.stringify(clients))
    // Initialize data state array with clients and value 0
    const initialData = clients.map(client => ({ id: client.client, value: 0 }));
    console.log(JSON.stringify(initialData));
    setData(prevData => [...prevData,...initialData]);
    console.log(data);
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
};


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
    fetchClientData();
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

  const fetchData = async() => {
  try{
    const url = "http://0.0.0.0:3000/totalPackets";
    
    const resposne = await fetch(url);
    if(!resposne.ok){
      console.error("Failed to fetch data");
    }
    const result = await resposne.json();
    const newData = result.map(item=>({id:item.client, value:item.packets}));
    const totalPackets = result.reduce((sum, item) => sum + item.packets, 0);

    setData(newData);
    setCenterText(totalPackets)
  } catch(error){
    console.error("failed:", error.message);
    
  }
  };  




  const fetchBarData = () => {
    const throughPacketsUrl = "http://0.0.0.0:3000/throughPackets";
    const totalPacketsUrl  = "http://0.0.0.0:3000/totalPackets"

    fetch(throughPacketsUrl)
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
    .then(throughPacketData => {
      // Calculate total accepted packets for each client
      const totalAcceptedByClient = throughPacketData.reduce((acc, curr) => {
        acc[curr.client] = curr.packets;
        return acc;
      }, {});

      // Fetch totalPackets data
      return fetch(totalPacketsUrl)
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
        .then(totalPacketData => {
          // Calculate total packets
          const totalPackets = totalPacketData.reduce((acc, curr) => {
            return acc + curr.packets;
          }, 0);

          // Update barData state
          const barData = Object.entries(totalAcceptedByClient).map(([client, accepted]) => ({
            country: client,
            Accepted: totalPackets - accepted,
            Lost: accepted  // Calculate lost packets
          }));
          setBarData(barData);
        });
    })
    .catch(error => {
      console.error('Error: ', error.message);
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
