import React, {Component} from "react";
import {connect} from "react-redux";

class OutputContainer extends Component {
  componentDidUpdate() {
    this.props.onUpdate();
  }

  render() {
    return (
      <div className="output-container">
        {this.props.handshakes.map(h =>
          <div key={h.timestamp} className="handshake">
            {h.input ? <div
              className="input command-line">{h.input}</div> : null}
            {h.output ? <div className="output">{h.output.split("\n")
              .map((p, i) => <p key={i}>{p}</p>)}</div> : null}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    handshakes: state.output.get("handshakes").toJS(),
  };
}

const connected = connect(mapStateToProps)(OutputContainer);

export default connected;