import {reset, send} from "../enum/Action";
import reduce from "./interface";
import INTERFACES from "../enum/Interfaces";
import store from "../store";

let i = INTERFACES.INTRO_WELCOME;

/**
 * Sends command
 * @param cmd
 */
function cmd(cmd) {
  store.dispatch(send(cmd));
}

/**
 * Expects the id from the last command
 * @param toBe - the expected id
 */
function id(toBe) {
  expect(store.getState().output.toJS().interface.id).toBe(toBe);
}

/**
 * Expects the output from the last command
 * @param toBe - the expected output
 */
function out(toBe) {
  expect(store.getState()
    .output
    .get("handshakes")
    .last()
    .get("output")).toBe(toBe);
}

describe("Tutorial", () => {
  beforeEach(() => {
    store.dispatch(reset());
  });

  test("Skip tutorial", () => {
    cmd("skip");
    id("HOME");
  });

  test("Go to test", () => {
    cmd("test");
    id("test");
  });

  test("Go through tutorial", () => {
    cmd("next");
    id("INTRO_PARAM");

    // Requires argument
    cmd("next");
    id("INTRO_PARAM");
    cmd("next -p");
    id("INTRO_PARAM_GUESS");

    cmd("next");
    id("INTRO_END");

    cmd("start");
    id("HOME");
  });
});
