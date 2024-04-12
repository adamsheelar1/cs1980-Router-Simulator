import React, { useState } from 'react';
import ClientSidebar from './ClientSidebar';


const ClientForm = () => {
  const[clientName, setClientName]= useState('');
  const [weightCap, setWeightCap] = useState('');
  const [frequencyCap, setFrequencyCap] = useState('');
  const [prioritySeed, setPriotirtySeed] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Client: clientName,
      WeightCap: parseInt(weightCap),
      FrequencyCap: parseInt(frequencyCap),
      PrioritySeed: parseInt(prioritySeed)
      
    };

    try {                                               
      const response = await fetch('http://0.0.0.0:2000/addClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add client');
      }

      // Handle success
      onAddClient(payload)
      console.log('Client added successfully');
      setClientName('');
      setWeightCap('');
      setFrequencyCap('');
      setPriotirtySeed('');
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{color: 'white'}}>
        Weight Cap:
        <input
          type="text"
          deafaultValue={"Weight Cap"}
          onChange={(e) => setWeightCap(e.target.value)}
        />
      </label>
      <br />
      <label style={{color: 'white'}}>
        Frequency Cap:
        <input
          type="text"
          defaultValue={"Frequency Cap"}
          onChange={(e) => setFrequencyCap(e.target.value)}
        />
      </label>
      <label style={{color: 'white'}}>
        Client Name
        <input
            type="text"
            defaultValue={"Client Name"}
            onChange={ (e) => setClientName(e.target.value)}
        />
      </label>
      <label style={{color: "white"}}>
        Priority Seed
        <input
            type="text"
            defaultValue={"Priority Seed"}
            onChange={ (e) => setPriotirtySeed(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;
