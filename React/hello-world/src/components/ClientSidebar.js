// ClientSidebar.js
import React, { useState, useEffect } from 'react';

const ClientSidebar = () => {
  const [clients, setCleints] = useState([]);


  useEffect(() => {
    const fetchClients = async() => {
      try{
        const response = await fetch('http://0.0.0.0:2000/getClients');
        const data = await response.json();
        setCleints(data)
      } catch(error){
        console.error("error fetching clients:", error);
      }
    };

    fetchClients();

  }, []);
  return(
  <div>
    <h2>Clients:</h2>
    <ul>
      {clients && clients.map((client, index) => (
        <li key={index}>
          <strong style={{color:'white' }}>Name:{client.client}</strong>
        </li>
      ))}
    </ul>
  </div>
);
};
export default ClientSidebar;
