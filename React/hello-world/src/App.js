import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import CenterBox from './components/CenterBox';
import MyResponsivePie from './components/MyResponsivePie';

function App() {
  const [displayText, setDisplayText] = useState('');
  const handleClick = () => {
    const buttonNumber = Math.floor(Math.random() * 6) + 1;
    setDisplayText(`Button clicked, random number is ${buttonNumber}`);
  };


  const [content, setContent] = useState('');
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
      .then(json => {
        setContent(JSON.stringify(json)); // Update the state with fetched data
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

      <div className="MyResponsivePie"><MyResponsivePie data={data} /></div>
        
      
      <div className="container">
      
        <Button onClick={() => fetchData()}>Fetch Data</Button>
        <Button onClick={handleClick}>Second</Button>
        <Button onClick={handleClick}>Third</Button>
        <Button onClick={handleClick}>Fourth</Button>
        <Button onClick={handleClick}>Fifth</Button>
        <Button onClick={handleClick}>Sixth</Button>
      </div>
    </div>
  );
}

export default App;
