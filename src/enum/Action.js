import {
  APPLY_CHECKPOINT,
  RESET,
  UPDATE_CHECKPOINT,
  USER_BACKSPACE,
  USER_INPUT,
  USER_NEXT_COMMAND,
  USER_PREV_COMMAND,
  USER_TYPE
} from "./ActionType";
import store from "../store";
import {getCurrentInterfaceId, getLastExecutedCommand} from "../util";

export function type(letter) {
  return {
    type: USER_TYPE,
    letter,
  };
}

export function backspace(deleteWord = false) {
  return {
    type: USER_BACKSPACE,
    deleteWord,
  };
}

export function send(value = store.getState().input.get("value"),
                     from = store.getState()
                       .output
                       .get("interface")
                       .get("id")) {
  return {
    type: USER_INPUT,
    value,
    from,
  };
}

export function prevCommand() {
  return {
    type: USER_PREV_COMMAND,
  };
}

export function nextCommand() {
  return {
    type: USER_NEXT_COMMAND,
  };
}

export function updateCheckpoint(checkpoint = store.getState().checkpoint,
                                 interfaceId = getCurrentInterfaceId(),
                                 command = getLastExecutedCommand()) {
  return {
    type: UPDATE_CHECKPOINT,
    checkpoint,
    interfaceId,
    command,
  };
}

/**
 * Resets the game and force the current checkpoint to be the one
 * provided
 * @param checkpoint
 * @return {{type}}
 */
export function applyCheckpoint(checkpoint) {

}

export function reset() {
  return {
    type: RESET,
  };
}