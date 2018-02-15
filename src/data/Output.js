import Immutable from "immutable";
import Interface from "./Interface";

const Output = new Immutable.Record({
  interface : new Interface(),
  // A list of all previous communications between the user and the
  // game
  handshakes: Immutable.List(),
}, "Output");

export default Output;