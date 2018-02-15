import {createStore} from "redux";
import persistedReducer from "../persistor/persistedReducer";

const store = createStore(persistedReducer,
 typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;