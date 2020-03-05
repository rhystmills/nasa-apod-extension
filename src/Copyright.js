import React from 'react';

class Copyright extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
  if(this.props.copyright){
      return (
        <h4 className="copyright">
          Copyright: {this.props.copyright}
        </h4>
      )
    } else {
      return (
        <h4></h4>
      )
    }
  }
}

export default Copyright;
