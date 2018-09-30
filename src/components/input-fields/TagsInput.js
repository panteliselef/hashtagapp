import React from 'react';
import './inputs.css';
const TagsInput = (props) => {

  return (
    <input className="tags-input" autoFocus={true} onChange={props.handleChange} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder="Type hash tags"/>
  );
}


export default TagsInput;