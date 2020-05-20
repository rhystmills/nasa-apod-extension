import React from 'react';
import blinkingCircle from '../vectors/blinking-circle.svg';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    return (
      <div className={`offlineInd ${navigator.onLine ? 'hidden' : 'visible'}`}>
        <img className="blinker" style={{marginRight: "5px"}} src={blinkingCircle} />
        Offline
      </div>
    )
  }
}

export default Main;
