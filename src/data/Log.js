import Immutable from "immutable";

const Log = new Immutable.Record({
  // A list of timestamp. Each timestamp means a checkpoint is
  // unlocked
  timestamp: Immutable.List(),
}, "Log");

export default Log;