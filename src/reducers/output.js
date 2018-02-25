import Immutable from "immutable";

import Output from "../data/Output";
import INTERFACES from "../enum/Interfaces";
import reduceInterface from "./interface";
import {RESET, USER_INPUT} from "../enum/ActionType";
import Handshake from "../data/Handshake";
import STRING from "../enum/String";
import {COMMAND_CLS} from "../enum/String";

const INITIAL_STATE = new Output({
  interface : INTERFACES.INTRO_WELCOME,
  handshakes: new Immutable.List([
    new Handshake({
      output: STRING.INTRO_WELCOME,
    })
  ])
});

/**
 * Reduces according to `_signal`
 * @param state
 */
function reduceSignal(state) {
  let signal = state.get("interface").get("feedback");

  switch (signal) {
    case COMMAND_CLS:
      return state.set("handshakes", Immutable.List());
    default:
      return state;
  }
}

export default function reduce(state = INITIAL_STATE, action) {
  // Saturates interface with id if necessary
  if (state.get("interface").get("commands") === null) {
    state = state.set("interface",
      INTERFACES[state.get("interface").get("id")]);
  }

  switch (action.type) {
    case RESET:
      return INITIAL_STATE;
    case USER_INPUT:
      let interf = reduceInterface(state.get("interface"), action);

      let handshake = new Handshake({
        inputHeader: interf.get("property").get("header"),
        input      : action.value,
        output     : interf.get("feedback"),
        timestamp  : Date.now(),
      });

      return reduceSignal(state
        .set("interface", interf)
        .set("handshakes",
          state.get("handshakes").push(handshake)));

    default:
      return state;
  }

};