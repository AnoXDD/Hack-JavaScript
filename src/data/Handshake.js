import Immutable from "immutable";

const Handshake = new Immutable.Record({
  input    : "",
  output   : "",
  timestamp: Date.now(),
});

export default Handshake;