import React from 'react';
// import exampleImg from './example_img.jpg';
import CaptionTitle from './CaptionTitle.js'
import Copyright from './Copyright.js'
// import Description from './Description.js'
import DayButtons from './DayButtons.js'
import CustomScrollbars from './CustomScrollbars.js';

class CaptionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

// Render needs a dynamic thing that will put JSX in for each para in a description array

  render() {
    let date = new Date(this.props.date);
    let desc = this.props.description;

    if(desc){
      return (
          <div className="CaptionPanel">
            <header>
              <CaptionTitle />
              <h1>{this.props.title}</h1>
              <h5>{date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</h5>
              <Copyright copyright={this.props.copyright}/>
            </header>
            <hr/>
            <section className="description">
              <CustomScrollbars >
                {
                  desc.map(function(item, i){
                    return <p key={i}>{item}</p>
                  })
                }
              </CustomScrollbars>
            </section>
            <DayButtons
              nextDay={this.props.nextDay}
              prevDay={this.props.prevDay}
              nextDayAvailable={this.props.nextDayAvailable}
              prevDayAvailable={this.props.prevDayAvailable}
            />
          </div>
      );
    } else {
      return (
          <div className="CaptionPanel">

          </div>
      );
    }
  }
}

export default CaptionPanel;
