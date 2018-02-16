/**
 * Created by Anoxic on 1/14/2018.
 */

import {persistReducer} from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";

import {transforms} from "./transforms";
import reducer from "../reducers";
import Arg from "../data/Arg";
import Command from "../data/Command";
import Handshake from "../data/Handshake";
import Input from "../data/Input";
import Interface from "../data/Interface";
import Output from "../data/Output";

const persistConfig = {
  transforms     : [transforms, immutableTransform({
    records: [Arg, Command, Handshake, Input, Interface, Output]
  })],
  key            : 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;