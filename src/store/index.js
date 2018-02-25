import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";

import persistedReducer from "../persistor/persistedReducer";

const composeEnhancers = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,
  composeEnhancers(applyMiddleware(thunk)));


export default store;