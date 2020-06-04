import React from 'react';
// import {apiKey} from './Config.js'
import './App.css';
import CaptionPanel from './CaptionPanel.js'
import Canvas from './Canvas.js'
import Indicators from './indicators/Indicators.js'

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
      previousDayAvailable: false,
      buttonsActive: true,
      displayDate: ""
    };
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.testDay = this.testDay.bind(this);
  }

  componentDidMount() {
    console.log(this.state.date);
    let localResults = JSON.parse(localStorage.getItem('localResults'));

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
        displayDate: localDate
      })
    }
    //Change the request date to today
    // localDate = this.dateToString();
    // this.setState({
    //     date: localDate
    // })
    this.setState({
        date: this.dateToString(),
        requestedDate: this.dateToString()
      }, () => {
        this.fetchFromApi();
    })
  }


  nextDay(){
    if (this.state.buttonsActive){
      this.setState({
        buttonsActive: false,
        requestedDate: this.dateToString(this.state.date, 1)
        }, () => {
        this.fetchFromApi();
      })
    }
  }

  prevDay(override){
    if (this.state.buttonsActive){
      this.setState({
        buttonsActive: false,
        requestedDate: this.dateToString(this.state.date, -1)
        }, () => {
        this.fetchFromApi();
      })
    }
    if (override === true){
      this.setState({
        requestedDate: this.dateToString(this.dateToString(), -1)
        }, () => {
        this.fetchFromApi();
      })
    }
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
    apodObject.then(results => {
      if(!results.code){
        this.setState({
          requestedDate: results.date
          }, () =>
          this.processResults(results)
        )
      } else if (this.state.requestedDate === this.dateToString()){
        this.prevDay(true);
      }
    })
  }

  fetchPostsFromApod(date) {
    return fetch('https://zoay24183i.execute-api.eu-west-1.amazonaws.com/public?date=' + (date || this.state.requestedDate))
      .then(response => response.json())
  }

  processResults(results){
    localStorage.setItem('localResults', JSON.stringify(results));

    let nextDay = this.dateToString(this.state.requestedDate, 1);
    let prevDay = this.dateToString(this.state.requestedDate, -1)
    this.testDay(nextDay);
    this.testDay(prevDay,true);
    console.log(results);
    this.setState({
      buttonsActive: true,
      title: results.title,
      copyright: results.copyright,
      url: results.url,
      description: this.parseDescription(results.explanation),
      date: this.state.requestedDate,
      displayDate: results.date
    })
  }

  parseDescription(desc) {
    let newDesc = desc;

    // Remove anything after the triple Space
    if (desc.lastIndexOf("   ") !== -1 && newDesc.slice(newDesc.lastIndexOf("   "),newDesc.length-1).length <300){
      newDesc = newDesc.slice(0,newDesc.lastIndexOf("   "));
    }

    function returnArrayOfParagraphs(desc,paraArrayPassed){
      let paraArray = paraArrayPassed || [];

      if (desc.indexOf(".  ") !== -1){
        let paragraph = desc.slice(0,desc.indexOf(".  ")+1);
        let trimmedDesc = desc.slice(desc.indexOf(".  ")+3,desc.length)
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
        <Indicators/>
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
          date={this.state.displayDate}
          nextDayAvailable={this.state.nextDayAvailable}
          prevDayAvailable={this.state.prevDayAvailable}
        />
      </div>
    );
  }
}

export default App;
