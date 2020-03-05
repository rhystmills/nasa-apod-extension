import React from 'react';

class Description extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
  if(this.props.explanation){
      return (
        <h4 className="copyright">
          Copyright: {this.props.copyright}
        </h4>
      )
    } else {
      return (
        <span></span>
      )
    }
  }
}

export default Description;
