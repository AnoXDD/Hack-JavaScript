import {
  SET_CHECKPOINT,
  USER_BACKSPACE, USER_INPUT, USER_NEXT_COMMAND, USER_PREV_COMMAND,
  USER_TYPE
} from "./ActionType";
import store from "../store";

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

export function setCheckpoint(checkpoint) {
  return {
    type: SET_CHECKPOINT,
    checkpoint,
  };
}