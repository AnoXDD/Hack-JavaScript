import {applyCheckpoint, reset, send} from "../enum/Action";
import reduce from "./interface";
import INTERFACES from "../enum/Interfaces";
import store from "../store";
import {
  INTERNAL_PASSWORD_ACQUIRED,
  INTRODUCTION, RESIGNATION_BOOKED
} from "../enum/Checkpoint";
import {COMPANY_INTERNAL, ME_COMPANY, USER_LIST} from "../enum/Names";
import MAILS from "../enum/Mails";
import {
  getCompanyInternalCommand,
  getCurrentCheckpoint
} from "../util";
import {
  COMMAND_REQUEST, PASSWORD_HEADER, REQUEST_EMPTY, SSH_OUTPUT,
  SSH_PROP
} from "../enum/String";
import PASSWORDS from "../enum/Passwords";

let i = INTERFACES.INTRO_WELCOME;

/**
 * Sends command
 * @param cmd
 */
function cmd(cmd) {
  store.dispatch(send(cmd));
}

/**
 * Asserts the last command is valid
 */
function wasValid() {
  expect(getOutput().indexOf("not found")).toBe(-1);
}

function wasInvalid() {
  outc("not found");
}

/**
 * Expects the id from the last command
 * @param toBe - the expected id
 */
function id(toBe) {
  expect(store.getState().output.toJS().interface.id).toBe(toBe);
}

function getOutput() {
  store.getState()
    .output
    .get("handshakes")
    .last()
    .get("output");
}

/**
 * Expects the output from the last command
 * @param toBe - the expected output
 */
function out(toBe) {
  expect(getOutput()).toBe(toBe);
}
function nout(toBe) {
  expect(getOutput()).not.toBe(toBe);
}

/**
 * Expects the output to contain
 * @param contains
 */
function outc(contains) {
  expect(getOutput().indexOf(contains)).not.toBe(-1);
}
function noutc(contains) {
  expect(getOutput().indexOf(contains)).toBe(-1);
}

/**
 * Expects the output header to be
 * @param toBe
 */
function outh(toBe) {
  expect(store.getState()
    .output
    .get("handshakes")
    .last()
    .get("inputHeader")).toBe(toBe);
}

/**
 * Checks current checkpoint
 * @param checkpoint
 */
function cp(checkpoint) {
  expect(getCurrentCheckpoint()).toBe(checkpoint);
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

describe("Road to another company", () => {
  beforeEach(() => {
    store.dispatch(applyCheckpoint(INTRODUCTION));
  });

  test(
    "The user shouldn't be able to log in other accounts except his own",
    () => {
      for (let user of USER_LIST) {
        if (user === ME_COMPANY) {
          continue;
        }

        cmd(`${getCompanyInternalCommand()} -u ${user}`);
        outc("user not found");
      }
    });

  test("Submit resignation request", () => {
    cmd("mail");
    outc("1 unread email");

    cmd("mail -u");
    outc(MAILS[INTRODUCTION]);
    cp(INTERNAL_PASSWORD_ACQUIRED);

    cmd(`${getCompanyInternalCommand()} -u ${ME_COMPANY}`);
    outh(PASSWORD_HEADER);

    cmd(PASSWORDS.PLAYER);
    noutc(SSH_OUTPUT.fail);

    cmd(COMMAND_REQUEST);
    noutc(REQUEST_EMPTY);

    cmd(`${COMMAND_REQUEST} -b`);
    outc("You have booked a meeting");
    cp(RESIGNATION_BOOKED);
  });
});