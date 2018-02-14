import {USER_BACKSPACE, USER_INPUT, USER_TYPE} from "./ActionType";

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

export default {
  type,
  backspace,
  send,
}