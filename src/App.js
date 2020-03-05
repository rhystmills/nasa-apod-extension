import React from 'react';
// import exampleImg from './example_img.jpg';
// import {apiKey} from './Config.js'
import './App.css';
import CaptionPanel from './CaptionPanel.js'
import Canvas from './Canvas.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ["Loading"],
      copyright: "",
      img: "",
      apiKey: process.env.REACT_APP_API_KEY,
      date: "",
      requestedDate: "",
      apiResults: {},
      url: "",
      nextDayAvailable: false,
      previousDayAvailable: false
    };
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.testDay = this.testDay.bind(this);
  }

  componentDidMount() {
    const localResults = JSON.parse(localStorage.getItem('localResults'));
    let localDate = "";
    //Check that local results are not an error from the API
    //Then set the date to the local date
    if (localResults && !localResults.code) {
      localDate = this.dateToString(localResults.date)
    } else {
      localDate = this.dateToString();
    }
    //Update the state to the local results if not an error
    if(localResults && !localResults.code){
      this.setState({
        title: localResults.title,
        copyright: localResults.copyright,
        url: localResults.url,
        description: this.parseDescription(localResults.explanation),
        date: localDate
      })
    }
    //Change the request date to today
    this.setState({
      requestedDate: this.dateToString()
    }, () => {
      this.fetchFromApi();
    })

    if (navigator.onLine) {
      console.log('online');
    } else {
      console.log('offline');
    }
    window.addEventListener('online', function(e) {
      // Re-sync data with server.
      console.log("online")
    }, false);

    window.addEventListener('offline', function(e) {
      // Queue up events for server.
      console.log("offline")
    }, false);
  }


  nextDay(){
    let newDate = this.dateToString(this.state.date,1)
    this.setState({
      requestedDate: newDate
      }, () => {
      this.fetchFromApi();
    })
  }

  prevDay(){
    let newDate = this.dateToString(this.state.date,-1)
    this.setState({
      requestedDate: newDate
      }, () => {
      this.fetchFromApi();
    })
  }

  testDay(date,prevDay){
    //Tests next day by default, If prevDay is true, tests prev day.
    var self = this;
    let availability = "";

    const apodObject = this.fetchPostsFromApod(date);
    apodObject
      .then(results => codeTest(results))

    function codeTest(results){
      // console.log(results)
      if (results.code) {
        availability = false
      } else {
        availability = true
      }
      if (prevDay){
        self.setState({prevDayAvailable: availability})
      } else {
        self.setState({nextDayAvailable: availability})
      }
    }
  }

  dateToString(dateString, modifier) {
    //Returns today, or a date for the dateString parameter changed by the modifier
    let newDate = "";
    if (dateString){
      //Sets date to passed date string (as a Date object)
      newDate = new Date(dateString);
    } else {
      //Sets date to today (as a Date object)
      newDate = new Date();
    }
    //Modifies the date with the modifier
    if(modifier){
      newDate.setDate(newDate.getDate() + modifier);
    }
    //Converts the Date object to an iso string, and only keeps the first 10 characters
    newDate = newDate.toISOString().slice(0,10);
    return newDate;
  }

  fetchFromApi(){
    //Fetches current date's info from APOD
    const apodObject = this.fetchPostsFromApod();
    console.log(apodObject)
    apodObject.then(results => this.processResults(results))
  }

  fetchPostsFromApod(date) {
    return fetch('https://api.nasa.gov/planetary/apod?api_key='+this.state.apiKey+'&date='+(date||this.state.requestedDate))
      .then(response => response.json())
  }

  processResults(results){
    localStorage.setItem('localResults', JSON.stringify(results));

    //If request fails
    if (results.code && this.state.requestedDate === this.dateToString()){
      this.setState({
        requestedDate: this.dateToString(this.dateToString(),-1)
      })
      return;
    }
    else if (results.code) {
      this.setState({
        requestedDate: this.dateToString()
      })
      return;
    }

    //Test the next and previous days for availability - updates state
    let nextDay = this.dateToString(this.state.requestedDate,1);
    let prevDay = this.dateToString(this.state.requestedDate,-1)
    this.testDay(nextDay);
    this.testDay(prevDay,true);
    console.log(results);

    this.setState({
      title: results.title,
      copyright: results.copyright,
      url: results.url,
      description: this.parseDescription(results.explanation),
      date: this.state.requestedDate
    })
  }

  parseDescription(desc) {
    console.log(desc)
    let newDesc = desc;

    // Remove anything after the triple Space
    if (desc.indexOf("   ") !== -1 && newDesc.slice(newDesc.indexOf("   "),newDesc.length-1).length <200){
      console.log(newDesc.slice(newDesc.indexOf("   "),newDesc.length-1));
      newDesc = newDesc.slice(0,newDesc.indexOf("   "));
      // console.log("Triple space found")
    }

    function returnArrayOfParagraphs(desc,paraArrayPassed){
      let paraArray = paraArrayPassed || [];
      // console.log(paraArray)

      if (desc.indexOf("  ") !== -1){
        let paragraph = desc.slice(0,desc.indexOf("  "));
        let trimmedDesc = desc.slice(desc.indexOf("  ")+2,desc.length)
        paraArray.push(paragraph);
        returnArrayOfParagraphs(trimmedDesc,paraArray)
      } else {
        // thisArray.push(length||desc.length);
        paraArray.push(desc)
      }
      return paraArray;
    }
    let paragraphs = (returnArrayOfParagraphs(newDesc));
    return paragraphs;
  }

  render() {
    return (
      <div className="App">
        <Canvas
          url={this.state.url}
          alt={this.state.title}
        />
        <CaptionPanel
          title={this.state.title}
          description={this.state.description}
          copyright={this.state.copyright}
          nextDay={this.nextDay}
          prevDay={this.prevDay}
          date={this.state.date}
          nextDayAvailable={this.state.nextDayAvailable}
          prevDayAvailable={this.state.prevDayAvailable}
        />
      </div>
    );
  }
}

export default App;
