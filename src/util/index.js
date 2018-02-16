import store from "../store";
import {ME} from "../enum/Names";

export function printLog() {
  store.getState();
  return "Todo: will print log later";
}

export function getHomeId() {
  return "HOME_INITIAL";
}

export function getSshOutput(name) {
  switch (name) {
    case ME:
      return `User: ${name}`;
    default:
      return `${name}: user not found`;
  }
}

export function getSshId() {
  return "SSH_PLAYER";
}

export function getInternalId() {
  return "INTERNAL_PLAYER";
}

export function getMailContent(id) {

}