import React from 'react';
import LeftArrow from './leftArrow.js'
import RightArrow from './RightArrow.js'

class DayButtons extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    let nextDayAvailable = "";
    if (this.props.nextDayAvailable){
      nextDayAvailable = "active"
    } else {
      nextDayAvailable = "inactive"
    }
    let prevDayAvailable = "";
    if (this.props.prevDayAvailable){
      prevDayAvailable = "active"
    } else {
      prevDayAvailable = "inactive"
    }
    return (
      <nav className="dayButtons">
        <div className={`inlineBlock nextButton dayButton ${nextDayAvailable}`} onClick={this.props.nextDay}>
          <LeftArrow className={`buttonImg ${nextDayAvailable}`}/>
          <span className="buttonText">Next Day</span>
        </div>
        <div className={`inlineBlock prevButton dayButton ${prevDayAvailable}`} onClick={this.props.prevDay}>
          <span className="buttonText">Previous Day</span>
          <RightArrow className={`buttonImg ${prevDayAvailable}`}/>
        </div>
      </nav>
    )

  }
}

export default DayButtons;
