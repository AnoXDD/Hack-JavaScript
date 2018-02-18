/**
 * Created by Anoxic on 1/14/2018.
 */

import {persistReducer} from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";

import {transforms} from "./transforms";
import reducer from "../reducers";

const persistConfig = {
  transforms     : [transforms, immutableTransform()],
  key            : 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;