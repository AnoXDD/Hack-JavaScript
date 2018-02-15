import Output from "../data/Output";
import INTERFACES from "../enum/Interfaces";
import reduceInterface from "./interface";
import {USER_INPUT} from "../enum/ActionType";
import Handshake from "../data/Handshake";

const initState = new Output({
  interface: INTERFACES.INTRO_WELCOME,
});

export default function reduce(state = initState, action) {
  switch (action.type) {
    case USER_INPUT:
      let interf = reduceInterface(state.get("interface"), action);
      let handshake = new Handshake({
        input    : action.value,
        output   : interf.get("output"),
        timestamp: Date.now(),
      });

      return state
        .set("interface", interf)
        .set("handshakes",
          state.get("handshakes").push(handshake));

    default:
      return state;
  }

};