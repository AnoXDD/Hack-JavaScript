import {
  USER_BACKSPACE, USER_INPUT, USER_NEXT_COMMAND, USER_PREV_COMMAND,
  USER_TYPE
} from "./ActionType";

export function type(letter) {
  return {
    type: USER_TYPE,
    letter,
  };
}

export function backspace() {
  return {
    type: USER_BACKSPACE,
  };
}

export function send() {
  return {
    type: USER_INPUT,
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

export default {
  type,
  backspace,
  send,
  prevCommand,
  nextCommand,
}