import React from 'react';

class Canvas extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    if (typeof this.props.url==="string"){
      if (this.props.url.indexOf('youtube')===-1){
        return (
          <div className="Canvas">
            <img className="imgOrVid" src={this.props.url} alt={this.props.alt}/>
          </div>
        )
      } else {
        return (
          <div className="Canvas">
            <iframe className="imgOrVid vid" src={this.props.url} title={this.props.alt} />
          </div>
        )
      }
    }
    else {
      return (
        <div className="Canvas">
          <img className="imgOrVid" src={this.props.url} alt={this.props.alt}/>
        </div>
      )
    }
  }
}

export default Canvas;
