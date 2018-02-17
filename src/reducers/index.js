import {combineReducers} from "redux";

import input from "./input";
import output from "./output";
import mailbox from "./mailbox";

export default combineReducers({
  input,
  output,
  mailbox,
});