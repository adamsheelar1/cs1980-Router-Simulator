import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import CenterBox from './components/CenterBox';
import MyResponsivePie from './components/MyResponsivePie';
import MyResponsiveNetwork from './components/MyResponsiveNetwork';
import FadeIn from './components/FadeIn'; // Import FadeIn component


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
  const initialData = {
    "nodes": [
      {
        "id": "Node 1",
        "height": 1,
        "size": 24,
        "color": "rgb(97, 205, 187)"
      },
      {
        "id": "Node 2",
        "height": 1,
        "size": 24,
        "color": "rgb(97, 205, 187)"
      },
      {
        "id": "Node 3",
        "height": 1,
        "size": 24,
        "color": "rgb(97, 205, 187)"
      },
      {
        "id": "Node 4",
        "height": 1,
        "size": 24,
        "color": "rgb(97, 205, 187)"
      },
      {
        "id": "Node 5",
        "height": 1,
        "size": 24,
        "color": "rgb(97, 205, 187)"
      },
      {
        "id": "Node 0",
        "height": 2,
        "size": 32,
        "color": "rgb(244, 117, 96)"
      },
      {
        "id": "Node 1.0",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 1.1",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 1.2",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 2.0",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 2.1",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 2.2",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 2.3",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 2.4",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 3.0",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 3.1",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 3.2",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 4.0",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 4.1",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 4.2",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 4.3",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 5.0",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 5.1",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 5.2",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 5.3",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 5.4",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 5.5",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      },
      {
        "id": "Node 5.6",
        "height": 0,
        "size": 12,
        "color": "rgb(232, 193, 160)"
      }
    ],
    "links": [
      {
        "source": "Node 0",
        "target": "Node 1",
        "distance": 80
      },
      {
        "source": "Node 1",
        "target": "Node 1.0",
        "distance": 50
      },
      {
        "source": "Node 1",
        "target": "Node 1.1",
        "distance": 50
      },
      {
        "source": "Node 1",
        "target": "Node 1.2",
        "distance": 50
      },
      {
        "source": "Node 0",
        "target": "Node 2",
        "distance": 80
      },
      {
        "source": "Node 2",
        "target": "Node 2.0",
        "distance": 50
      },
      {
        "source": "Node 2",
        "target": "Node 2.1",
        "distance": 50
      },
      {
        "source": "Node 2",
        "target": "Node 2.2",
        "distance": 50
      },
      {
        "source": "Node 2",
        "target": "Node 2.3",
        "distance": 50
      },
      {
        "source": "Node 2",
        "target": "Node 2.4",
        "distance": 50
      },
      {
        "source": "Node 0",
        "target": "Node 3",
        "distance": 80
      },
      {
        "source": "Node 3",
        "target": "Node 3.0",
        "distance": 50
      },
      {
        "source": "Node 3",
        "target": "Node 3.1",
        "distance": 50
      },
      {
        "source": "Node 3",
        "target": "Node 3.2",
        "distance": 50
      },
      {
        "source": "Node 0",
        "target": "Node 4",
        "distance": 80
      },
      {
        "source": "Node 4",
        "target": "Node 4.0",
        "distance": 50
      },
      {
        "source": "Node 4",
        "target": "Node 4.1",
        "distance": 50
      },
      {
        "source": "Node 4",
        "target": "Node 4.2",
        "distance": 50
      },
      {
        "source": "Node 4",
        "target": "Node 4.3",
        "distance": 50
      },
      {
        "source": "Node 0",
        "target": "Node 5",
        "distance": 80
      },
      {
        "source": "Node 5",
        "target": "Node 5.0",
        "distance": 50
      },
      {
        "source": "Node 5",
        "target": "Node 5.1",
        "distance": 50
      },
      {
        "source": "Node 5",
        "target": "Node 5.2",
        "distance": 50
      },
      {
        "source": "Node 5",
        "target": "Node 5.3",
        "distance": 50
      },
      {
        "source": "Node 5",
        "target": "Node 5.4",
        "distance": 50
      },
      {
        "source": "Node 5",
        "target": "Node 5.5",
        "distance": 50
      },
      {
        "source": "Node 5",
        "target": "Node 5.6",
        "distance": 50
      }
    ]
  };
  const [netData, setNetData] = useState(initialData);
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
