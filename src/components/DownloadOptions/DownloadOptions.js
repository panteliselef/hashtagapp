import React from 'react';
import '../input-fields/inputs.css';
class DownloadOptions extends React.Component {

  constructor() {
    super();
    this.state = {
      activeButton: "",
      hashTagArr: []
    }
    this.textArea = React.createRef();
  }
  onInputChange = (e) => {
    this.setState({activeButton: e.target.value});
    // console.log(e.target.value)
  }
  onButtonSubmit = (e) => {
    let newArr =[] ;
    e.preventDefault();
    console.log(this.state.activeButton);
    switch (this.state.activeButton) {
      case "top_10" :
        newArr = this.props.sortedArray.slice(0,10);
        break;
      case "top_15" :
        newArr = this.props.sortedArray.slice(0,15);
        break;
      default :
        newArr = this.props.sortedArray;
        break;
      }
      console.log(newArr);
      let editedArr = newArr.map(hashTag => {
        return `#${hashTag.name}`;
      })
      console.log(editedArr.join(" "));
      this.setState({hashTagArr: editedArr.join(" ")}, ()=> {
        const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0)     // Store selection if found
          : false;  
        this.textArea.current.select();
        document.execCommand('copy');
        if (selected) {                                 // If a selection existed before copying
          document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
          document.getSelection().addRange(selected);   // Restore the original selection
        }
      });
    
  }
  render() {
    return (
      <form className="download-form" action="" onSubmit={this.onButtonSubmit}>
        <label htmlFor="for-all">For All</label>
        <input type="radio" name="download" id="for_all" defaultChecked={true} onChange={this.onInputChange}  value="for_all"/><br/>
        <label htmlFor="top_10">Top 10</label>
        <input type="radio" name="download" id="top_10" onChange={this.onInputChange} value="top_10"/><br/>
        <label htmlFor="top_15">Top 15</label>
        <input type="radio" name="download" id="top_15" onChange={this.onInputChange} value="top_15"/><br/><br/>
        <textarea className="hidden" name="" id="" cols="30" rows="10" 
        
          defaultValue = { this.state.hashTagArr} ref={this.textArea}></textarea>
        <input type="submit" value="Download"/>
      </form>
    );
  }
}


export default DownloadOptions;