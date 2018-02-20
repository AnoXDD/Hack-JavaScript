import {combineReducers} from "redux";

import input from "./input";
import output from "./output";
import dynamics from "./dynamics";
import checkpoint from "./checkpoint";

export default combineReducers({
  input,
  output,
  dynamics,
  checkpoint,
});