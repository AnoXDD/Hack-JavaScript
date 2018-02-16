import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class CommandLine extends Component {
  render() {
    return (
      <span
        className="command-line">
        <span className="header">{this.props.header}</span>
        {this.props.password ?
          this.props.value.replace(/./g, "*") :
          this.props.value}
      </span>
    );
  }
};

CommandLine.propTypes = {
  value   : PropTypes.string.isRequired,
  header  : PropTypes.string.isRequired,
  password: PropTypes.bool,
};