/*
 * The whole state of the game
 */

import Immutable from "immutable";

const StateRecord = new Immutable.Record({
  input   : "",
  commands: Immutable.Set(),
});

export default StateRecord;