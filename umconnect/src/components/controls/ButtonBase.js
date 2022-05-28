import React from 'react';

const buttonStyle = {
  margin: '10px 0'
};

export const ButtonBase = ({ label, handleClick }) => (
  <button
    className="btn btn-default"
    style={buttonStyle}
    onClick={handleClick}
  >
    {label}
  </button>
);

//export default ButtonBase;