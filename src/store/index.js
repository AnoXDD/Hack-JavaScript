import reducer from "../reducers";
import State from "../data/State";
import {createStore} from "redux";


const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;