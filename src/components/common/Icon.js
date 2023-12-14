import React from 'react';
import * as Feather from 'react-feather';
import './Icon.css'; // Make sure to create a corresponding CSS file

const Icon = ({ name, ...props }) => {
  const IconComponent = Feather[name];
  if (!IconComponent) { // Icon doesn't exist in Feather icons
    return null;
  }

  return <IconComponent {...props} />;
};

export default Icon;
