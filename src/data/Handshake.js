import Immutable from "immutable";

const Handshake = new Immutable.Record({
  input    : null,
  output   : null,
  timestamp: Date.now(),
}, "Handshake");

export default Handshake;