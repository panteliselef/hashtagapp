import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TextField from './components/TextField/TextField';
import TopSection from './components/TopSection/TopSection';
import TagsInput from './components/input-fields/TagsInput';
import SubmitButton from './components/input-fields/SubmitButton';
import Results from './components/Results/Results';
import Banner from './components/Banner/Banner';
import DownloadOptions from './components/DownloadOptions/DownloadOptions';

// TODO: when submitting the input hashtags check if are the same as before
// this will reduce request on Instagram API
// TODO: handle/prevent duplicate request for input hashTags

// TODO:
// Check ColorTheme
// https://coolors.co/00a6fb-0582ca-006494-003554-051923
// https://coolors.co/app/db5461-e8bfae-ffede5-b5b5b0-424b54
// https://coolors.co/ee6868-ea4b4b-d74545-ec5a5a-ef7575
// https://coolors.co/122638-006494-247ba0-1b98e0-f6f9fa

// TODO: 
// Designs
// https://www.uplabs.com/posts/articlex-multipurpose-ios-uikit-followers-screen
// https://www.uplabs.com/posts/movie-booking-app-interaction
// https://www.uplabs.com/posts/news-startup-team-page-design-exploration
// https://www.uplabs.com/posts/header-dropdown-single-deck
// https://www.uplabs.com/posts/dashboard-concept-for-professional-killer
class App extends Component {
  constructor () {
    super() ;
    this.state = {
      searchFieldValue : "",
      accessToken: "accessTokenSample",
      instaApiWorks: true,
      hashTagArray : [],
      checkingArray: [],
      obgArray: [],
      hasDataToShow: false,
      dataLoaded: false,
      bannerShow: "hidden",
      bannerText: ""
    }
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  componentDidMount() {
    let accessToken  = this.getHash(window.location);
    if(accessToken) {
      console.log("1");
    }else console.log("2");
    this.setState({accessToken: accessToken});
    console.log(accessToken);
    // fetch(`https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=${accessToken}`)
    fetch(`https://api.instagram.com/v1/tags/search?q=snowy&access_token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
        console.log("ComponentDidMount",data);
        data.meta.code === 400 
        ? this.setState({instaApiWorks: false})
        : this.setState({instaApiWorks: true});
      })
      .catch(err => console.log("can't access instagram api"));
    // https://api.instagram.com/oauth/authorize/?client_id=7e9cc9cfc5fe47cfbccf7cfebe2572f8&redirect_uri=http://localhost:3000&response_type=token
    // https://api.instagram.com/oauth/authorize/?client_id=7e9cc9cfc5fe47cfbccf7cfebe2572f8&redirect_uri=http://localhost:3000&response_type=code&scope=basic+comments+follower_list+likes+relationships+public_content
  }

  getHash = (urlString) => {
    return urlString.hash.substring(14);
  }
  getTagsInfo = (arr) => {
    let accessToken  = this.getHash(window.location);

    let promise = arr.map(tag => {
      return fetch(`https://api.instagram.com/v1/tags/${tag}?access_token=${accessToken}`)
        .then(response => response.json())
        .then(res => {
          if(res.meta.code === 200) this.setState({obgArray:this.state.obgArray.concat(res.data)});
          else if(res.meta.code === 400) throw "Cannot get info for this tag";
        })
//        {data: {name: "one", media_count: 12787965}, meta: {code: 200}}
// {meta: {code: 400, error_type: "APINotAllowedError", error_message: "This tag cannot be viewed"}}
        .catch(err => console.log(`Cannot get info for this tag ${tag}`));
    })
    Promise.all(promise).then((results) =>{
      this.setState({obgArray: this.sortTags(this.state.obgArray)});
      this.setState({dataLoaded: true});
    })
  }


  sortTags = (arr) => {
    arr.sort(function (a, b) {
      return b.media_count - a.media_count  ;
    });
    return arr;
  }


  handleChange = (event) => {
    this.setState({
      searchFieldValue : event.target.value,
      bannerShow:"hidden"
    })
    console.log(event.target.value);
  }


  onSubmitButton = (event) => {
    event.preventDefault();
    if(this.state.searchFieldValue != ""){
      this.setState({hasDataToShow: true});
      this.setState({dataLoaded:false});
      this.setState({obgArray: []});
      let tagArr = this.state.searchFieldValue.split(" ");
      let newTagArr =tagArr.map(item => {
        return item.replace("#","");  
      })
      // this.getTagsInfo(newTagArr);
      console.log("newTagArr",newTagArr);
      let newNewTageArr = newTagArr.filter(item => {
        if (!this.state.checkingArray.includes(item)){
          console.log("this is a new hashtag. Name: ",item);
        }
        return !this.state.checkingArray.includes(item)
      });
      this.setState({checkingArray: this.state.checkingArray.concat(newNewTageArr)})
      console.log("newNewTagArr",newNewTageArr);
    }else {
      this.setState({bannerShow:"show"});
      this.setState({bannerText:"You haven't enter any hashtags"});
    }
    
  } 
  render() {
    return (
      this.state.accessToken && this.state.instaApiWorks ? (
      <div className="App">
        <TopSection/>
        <div style={{marginTop: "-30px"}}>
          <form action="">
            <TagsInput handleChange={this.handleChange}/>
            <SubmitButton onSubmitButton={this.onSubmitButton}/>

          </form>
        </div>
        <Banner show={this.state.bannerShow} content={this.state.bannerText}/>
        {this.state.hasDataToShow
        ? (
          <React.Fragment>
            <Results dataLoading={this.state.dataLoaded} results = {this.state.obgArray}/>
            <DownloadOptions sortedArray={this.state.obgArray}/>
          </React.Fragment>
        )
        : ""
        }
        <p>developer javascript react</p>
      </div>)
      : (
        <React.Fragment>
          <h2>NO</h2>
          <a href="https://api.instagram.com/oauth/authorize/?client_id=7e9cc9cfc5fe47cfbccf7cfebe2572f8&redirect_uri=http://localhost:3000&response_type=token">Press here to get access</a>
        </React.Fragment>
        )
    );
  }
}

export default App;
