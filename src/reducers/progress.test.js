import {send} from "../enum/Action";
import reduce from "./interface";
import INTERFACES from "../enum/Interfaces";

let i = INTERFACES.INTRO_WELCOME;

/**
 * Executes a command
 * @param cmd
 */
function e(cmd) {
  i = reduce(i, send(cmd));

  return {
    f: i.get("feedback"),
    i: i.get("id"),
    h: i.get("header"),
    p: i.get("password"),
  };
}

test("Introduction of game", () => {
  expect(e("next").i).toBe("INTRO_PARAM");

  expect(e("next").i).toBe("INTRO_PARAM");
  expect(e("next -p").i).toBe("INTRO_PARAM_GUESS");

  expect(e("next").i).toBe("INTRO_END");

  expect(e("start").i).toBe("HOME_INITIAL");
});

// test("First letter in public mailbox", () => {
// })