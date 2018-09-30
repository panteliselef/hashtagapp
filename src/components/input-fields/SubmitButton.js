import React from 'react';
import './inputs.css';
const SubmitButton = (props) => {

  return (
    <button 
      className="submit-button"
      onClick={props.onSubmitButton}
      >sort</button>
  );
}


export default SubmitButton;