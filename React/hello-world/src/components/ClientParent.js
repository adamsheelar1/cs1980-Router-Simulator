import React, { useState } from 'react';
import ClientForm from './ClientForm';
import ClientSidebar from './ClientSidebar';

const ClientParent = ({onDataUpdate}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [clients, setClient] = useState([]);


  const handleClientAdd = (newClient) => {
    setShowSidebar(true);
    setClient([...clients, newClient])
    onDataUpdate([...clients,newClient ])

  };

  return (
    <div>
      <ClientForm onClientAdd={handleClientAdd} />
      {showSidebar && <ClientSidebar />}
    </div>
  );
};

export default ClientParent;
