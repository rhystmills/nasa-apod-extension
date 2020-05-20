import React from 'react';
import logo from './vectors/NASA_logo.svg';

function CaptionTitle() {
  return (
    <span className="title">
      <img className="logo" src={logo} alt="NASA logo"/>
      <div className="vertFlex">
        <h3 className="inline-block">Astronomy Photo of the Day</h3>
      </div>
    </span>
  );
}

export default CaptionTitle;
