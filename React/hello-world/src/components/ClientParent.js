import React, { useState } from 'react';
import ClientForm from './ClientForm';
import ClientSidebar from './ClientSidebar';

const ClientParent = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleClientAdd = () => {
    setShowSidebar(true);

  };

  return (
    <div>
      <ClientForm onClientAdd={handleClientAdd} />
      {showSidebar && <ClientSidebar />}
    </div>
  );
};

export default ClientParent;
