import React from 'react';
import './Results.css'
const Results = (props) => {

  
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (  
    <ul className="results">
      {props.dataLoading 
      ? props.results.map((item,i)=> {
        return (
          <li key={i}><div>{`#${item.name}`}</div><div>{`${numberWithCommas(item.media_count)} Posts`}</div></li>
        )
      })
      : "Loading ..."
      }
      
    </ul>
  );
}


export default Results;