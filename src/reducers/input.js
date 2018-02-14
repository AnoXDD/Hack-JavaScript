import {
  USER_BACKSPACE, USER_INPUT, USER_NEXT_COMMAND, USER_PREV_COMMAND,
  USER_TYPE
} from "../enum/ActionType";
import Input from "../data/Input";

export const initialState = new Input();

/**
 * Gets the history with a delta (go back or forward)
 * @param state
 * @param delta
 */
function getHistory(state, delta) {
  let historyIndex = state.get("historyIndex") + delta;
  if (historyIndex < 0 || historyIndex >= state.get("history").size) {
    // Out of bounds
    return state;
  }

  let value = state.get("history").get(historyIndex);
  return state
    .set("value", value)
    .set("historyIndex", historyIndex);
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case USER_TYPE:
      return state.set("value", state.get("value") + action.letter);
    case USER_BACKSPACE:
      return state.set("value",
        state.get("value").slice(0, -1));
    case USER_INPUT:
      let value = state.get("value");
      let history = state.get("history").push(value);
      let historyIndex = history.size;

      return state.set("value", "")
        .set("history", history)
        .set("historyIndex", historyIndex);
    case USER_PREV_COMMAND:
      return getHistory(state, -1);
    case USER_NEXT_COMMAND:
      return getHistory(state, +1);
    default:
      return state;
  }
};