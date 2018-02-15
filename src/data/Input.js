import Immutable from "immutable";

const InputRecord = new Immutable.Record({
  value       : "",
  history     : Immutable.List([""]),
  // When browsing past history, the index of current command
  historyIndex: 0,
}, "Input");

export default InputRecord;