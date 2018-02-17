import Immutable from "immutable";
import {TUTORIAL} from "../enum/Checkpoint";

const Mailbox = new Immutable.Record({
  mailbox : Immutable.Map(),
  checkpoint: TUTORIAL,
}, "Mailbox");

export default Mailbox;