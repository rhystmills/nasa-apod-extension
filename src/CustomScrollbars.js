import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import css from 'dom-css';

export default class CustomScrollbars extends Component {

	constructor(props, ...rest) {
		super(props, ...rest);
		this.state = {
      top: 0,
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    };
		this.handleUpdate = this.handleUpdate.bind(this);
		this.renderView = this.renderView.bind(this);
		this.renderThumb = this.renderThumb.bind(this);
	}

	handleUpdate(values) {
		const { top } = values;
    const { shadowTop, shadowBottom } = this.refs;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = 1 / 10 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = 1 / 10 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    css(shadowTop, { opacity: shadowTopOpacity });
    css(shadowBottom, { opacity: shadowBottomOpacity });
		this.setState({ top });
	}

	renderView({ style, ...props }) {
		const { top } = this.state;
		const viewStyle = {
			paddingRight: 20,
		};
		return (
			<div
				className="box"
				style={{ ...style, ...viewStyle }}
				{...props}
      />
		);
	}

	renderThumb({ style, ...props }) {
		const { top } = this.state;
		return (
			<div
        className="thumb"
				style={{ ...style }}
				{...props}
      />
		);
	}

	render() {
    const { style, ...props } = this.props;
    const containerStyle = {
      ...style,
      position: 'relative'
      };
    const shadowTopStyle = {
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      right: 0,
      height: 40,
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
    };
    const shadowBottomStyle = {
      position: 'absolute',
      pointerEvents: 'none',
      bottom: 0,
      left: 0,
      right: 0,
      height: 40,
      background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
    };

		return (
      <div style={containerStyle} className="scrollbarPara">
  			<Scrollbars
          ref="scrollbars"
          // autoHeight
          // autoHeightMin={100}
          // autoHeightMax={100}
  				renderView={this.renderView}
  				renderThumbHorizontal={this.renderThumb}
  				renderThumbVertical={this.renderThumb}
  				onUpdate={this.handleUpdate}
          className="scrollbarPara"
  				{...this.props}
        />
        <div
          ref="shadowTop"
          style={shadowTopStyle}
        />
        <div
          ref="shadowBottom"
          style={shadowBottomStyle}
        />
      </div>
		);
	}
}

CustomScrollbars.propTypes = {
    style: PropTypes.object
};
