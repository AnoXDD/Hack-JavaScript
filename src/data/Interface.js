/*
 A class to store current available commands
 */

import Immutable from "immutable";

const Interface = new Immutable.Record({
  id      : null,
  // A list of available commands, excluding "help"
  commands: Immutable.List(),
  // The id of parent interface
  parentId: null,
  // String only. What will be printed to the console. This field is
  // supposed to be set by the reducer, not by the user
  feedback: "",
  // The header of the command line
  header  : "",
}, "Interface");

export default Interface;