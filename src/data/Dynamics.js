import Immutable from "immutable";
import {TUTORIAL} from "../enum/Checkpoint";

const Dynamics = new Immutable.Record({
  mailbox   : Immutable.Map(),
  request   : Immutable.Map(),
  plugin    : Immutable.List(),
  checkpoint: TUTORIAL,
}, "Dynamics");

export default Dynamics;