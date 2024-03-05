import React from "react";

const Button = ({ onClick, color, children }) => {
    return (
      <button className={`button ${color}`} onClick={onClick}>
        {children}
      </button>
    );
  };

export default Button;