import {
  USER_BACKSPACE, USER_INPUT,
  USER_TYPE
} from "../enum/ActionType";

const initialState = "";

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case USER_TYPE:
      return state + action.letter;
    case USER_BACKSPACE:
      return state.slice(0, -1);
    case USER_INPUT:
      return initialState;
    default:
      return state;
  }
};