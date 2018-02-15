import {combineReducers} from "redux";

import input from "./input";
import interf from "./interface";

export default combineReducers({
  input,
  "interface": interf,
});