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
        <div className={`inlineBlock prevButton dayButton ${prevDayAvailable}`} onClick={this.props.prevDay}>
          <LeftArrow className={`buttonImg ${prevDayAvailable}`}/>
          <span className="buttonText">Previous Day</span>
        </div>
        <div className={`inlineBlock nextButton dayButton ${nextDayAvailable}`} onClick={this.props.nextDay}>
          <span className="buttonText">Next Day</span>
          <RightArrow className={`buttonImg ${nextDayAvailable}`}/>
        </div>
      </nav>
    )

  }
}

export default DayButtons;
