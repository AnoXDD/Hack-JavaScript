import {
  RESET,
  USER_BACKSPACE, USER_INPUT, USER_NEXT_COMMAND, USER_PREV_COMMAND,
  USER_TYPE
} from "../enum/ActionType";
import Input from "../data/Input";

const INITIAL_STATE = new Input();

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

function syncLastCommand(state) {
  let history = state.get("history");
  if (state.get("historyIndex") === history.size - 1) {
    // This is the last command, sync it
    history = history.set(history.size - 1, state.get("value"));
    return state.set("history", history);
  }

  return state;
}

export default function reduce(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET:
      return INITIAL_STATE;
    case USER_TYPE:
      return syncLastCommand(state.set("value", state.get("value") + action.letter));
    case USER_BACKSPACE: {
      let value = state.get("value");

      if (action.deleteWord) {
        value = value.split(" ").slice(0, -1).join(" ");
      } else {
        value = value.slice(0, -1);
      }

      return syncLastCommand(state.set("value", value));
    }
    case USER_INPUT: {
      // todo handle empty string
      let history = state.get("history");
      let value = state.get("value");

      if (value.trim() !== "") {
        history = history.set(history.size - 1, value);

        // Do not store if the new command is the same as the last
        // command in the history
        if (history.size > 1 && history.get(history.size - 2) === state.get(
            "value")) {
          history = history.pop();
        }

        history = history.push("");
      }

      return state.set("value", "")
        .set("history", history)
        .set("historyIndex", history.size - 1);
    }
    case USER_PREV_COMMAND:
      return getHistory(state, -1);
    case USER_NEXT_COMMAND:
      return getHistory(state, +1);
    default:
      return state;
  }
};