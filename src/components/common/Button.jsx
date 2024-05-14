// Import necessary libraries
import React from 'react';
import PropTypes from 'prop-types';

// Define the ButtonAction component
function Button({ title, onClick, icon }) {
  // Render a button with the provided title, onClick handler, and icon
  return (
    <button className='button-action' type='button' title={title} onClick={onClick}>
      {icon}
    </button>
  );
}

// Define the prop types for the ButtonAction component
Button.propTypes = {
  title: PropTypes.string.isRequired, // The title of the button (displayed on hover)
  onClick: PropTypes.func.isRequired, // The function to call when the button is clicked
  icon: PropTypes.object.isRequired // The icon to display on the button
};

// Export the ButtonAction component
export default Button;
