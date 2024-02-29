import React from 'react';

const CenterBox = ({ children, text }) => {
  return (
    <div className="centered-box">
      {text && <p>{text}</p>}
      {children}
    </div>
  );
};

export default CenterBox;
