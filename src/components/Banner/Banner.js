import React from 'react';
import './Banner.css'
const Banner = (props) => {
  
  return (
    <div className={`banner ${props.show}`}>
      {props.content}
    </div>
  );
}


export default Banner;