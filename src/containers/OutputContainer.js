import React, {Component} from "react";

import CommandLine from "../components/CommandLine";
import {connect} from "react-redux";

class OutputContainer extends Component {
  render() {
    return (
      <div className="output-container">
        {this.props.handshakes.map(h =>
        <div key={h.timestamp} className="handshake">
          <div className="input command-line">{h.input}</div>
          <div className="output">{h.output}</div>
        </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    handshakes: state.output.get("handshakes"),
  };
}

const connected = connect(mapStateToProps)(OutputContainer);

export default connected;