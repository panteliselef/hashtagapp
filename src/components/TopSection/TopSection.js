import React from 'react';
import './TopSection.css';
import Header from '../Header/Header';
import Title from '../Title/Title';
import Subtitle from '../Subtitle/Subtitle';
const TopSection = () => {

  return (
    <div className="outer">
      <Header/>
      <Title/>
      <Subtitle/>
    </div>
  );
}


export default TopSection;