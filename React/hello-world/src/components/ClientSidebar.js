// ClientSidebar.js
import React from 'react';

const ClientSidebar = ({ clients }) => (
  <div>
    <h2>Clients:</h2>
    <ul>
      {clients && clients.map((client, index) => (
        <li key={index}>
          {client.Client} - Weight Cap: {client.WeightCap}, Frequency Cap: {client.FrequencyCap}, Priority Seed: {client.PrioritySeed}
        </li>
      ))}
    </ul>
  </div>
);

export default ClientSidebar;
