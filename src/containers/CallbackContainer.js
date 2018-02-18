/*
  The sole purpose of this empty container is to fire callback on certain events
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import {getCurrentInterfaceId, getLastExecutedCommand} from "../util";
import store from "../store";
import {updateCheckpoint} from "../enum/Action";

class CallbackContainer extends Component {
  componentWillReceiveProps(nextProps) {
    let {checkpoint, interfaceId, command} = nextProps;
    store.dispatch(updateCheckpoint(checkpoint,
      interfaceId,
      command));
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    checkpoint : state.checkpoint,
    interfaceId: getCurrentInterfaceId(state),
    command    : getLastExecutedCommand(state),
  };
}

const connected = connect(mapStateToProps)(CallbackContainer);

export default connected;