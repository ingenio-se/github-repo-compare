import React from 'react';
import './Button.css'; // Make sure to create a corresponding CSS file

const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
