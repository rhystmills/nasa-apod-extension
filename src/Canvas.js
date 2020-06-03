import React from 'react';
import LoadSpinner from './LoadSpinner.js'

class Canvas extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
    this.imgIsRendered = this.imgIsRendered.bind(this);
  }
  componentDidUpdate(prevProps){
    // console.log(`prevProps: ${prevProps.url}, props: ${this.props.url}`)
    if (prevProps.url != this.props.url && prevProps.url != ""){
      this.setState({ loaded: false})
    }
  }
  imgIsRendered(){
    this.setState({
      loaded: true
    })
  }
  render(){
    if (typeof this.props.url==="string"){
      if (this.props.url.indexOf('youtube')===-1){
        return (
          <div className="Canvas">
            <div className = {`loadSpinner ${this.state.loaded ? "hidden" : "visible"}`}>
              <LoadSpinner/>
            </div>
            <img className="imgOrVid" src={this.props.url} alt={this.props.alt} onLoad={this.imgIsRendered}/>
          </div>
        )
      } else {
        return (
          <div className="Canvas">
            <div className = {`loadSpinner ${this.state.loaded ? "hidden" : "visible"}`}>
              <LoadSpinner/>
            </div>
            <iframe className="imgOrVid vid" src={this.props.url} title={this.props.alt} onLoad={this.imgIsRendered}/>
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
