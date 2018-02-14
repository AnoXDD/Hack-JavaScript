import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class CommandLine extends Component {
  render() {
    return (
      <span className="command-line">{this.props.value}</span>
    );
  }
};

CommandLine.propTypes = {
  value: PropTypes.string.isRequired,
};