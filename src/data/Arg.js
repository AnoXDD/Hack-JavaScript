import Immutable from "immutable";

const Arg = new Immutable.Record({
  // -s or --save in `npm install -s package", with dash
  match      : Immutable.Set([""]),
  help       : "",
  // Outputs this or callback function this when this command is
  // executed
  output     : "",
  // Go to this `Interface` when this command is executed, null to
  // stay where it is
  interfaceId: null,
}, "Arg");

export default Arg;