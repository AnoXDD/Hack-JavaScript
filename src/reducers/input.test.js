import Input from "../data/Input";
import reduce from "./input";
import {
  backspace, nextCommand, prevCommand, send,
  type
} from "../enum/Action";

test("Type a letter", () => {
  let input = new Input();

  input = reduce(input, type("d"));
  input = reduce(input, type("d"));

  expect(input.get("value")).toBe("dd");
});

describe("Backspace", () => {
  test("Backspace on empty", () => {
    let input = new Input();

    input = reduce(input, backspace());
    expect(input.get("value")).toBe("");

    input = reduce(input, backspace(true));
    expect(input.get("value")).toBe("");
  });

  test("Backspace without ctrl", () => {
    let input = new Input();

    input = reduce(input, type("d"));
    input = reduce(input, type("d"));
    input = reduce(input, backspace());

    expect(input.get("value")).toBe("d");
  });

  test("Backspace with ctrl", () => {
    let input = new Input();

    input = reduce(input, type("dd dd dd dd"));
    input = reduce(input, backspace(true));

    expect(input.get("value")).toBe("dd dd dd");

    input = reduce(input, backspace(true));

    expect(input.get("value")).toBe("dd dd");
  });
});

describe("History", () => {
  let input = null;

  beforeEach(() => {
    input = new Input();

    input = reduce(input, type("1"));
    input = reduce(input, send());
    input = reduce(input, type("2"));
    input = reduce(input, send());
    input = reduce(input, type("3"));
    input = reduce(input, send());
  });

  test("History is stored", () => {
    expect(input.get("history").toJS()).toEqual(["1", "2", "3", ""]);
    expect(input.get("historyIndex")).toBe(3);
  });

  test("History access", () => {
    input = reduce(input, prevCommand());
    expect(input.get("value")).toBe("3");

    input = reduce(input, prevCommand());
    expect(input.get("value")).toBe("2");

    input = reduce(input, nextCommand());
    expect(input.get("value")).toBe("3");
  });

  test("History is immutable", () => {
    input = reduce(input, prevCommand());
    input = reduce(input, prevCommand());
    input = reduce(input, type("2"));
    expect(input.get("value")).toBe("22");
    expect(input.get("history").get(1)).toBe("2");
  });

  test("Execute command in the history will add to history", () => {
    input = reduce(input, prevCommand());
    input = reduce(input, prevCommand());
    input = reduce(input, send());

    expect(input.get("history").toJS())
      .toEqual(["1", "2", "3", "2", ""]);
    expect(input.get("historyIndex")).toBe(4);
  });

  test("Invalid history access", () => {
    input = reduce(input, nextCommand());
    expect(input.get("value")).toBe("");

    input = reduce(input, prevCommand());
    input = reduce(input, prevCommand());
    input = reduce(input, prevCommand());
    input = reduce(input, prevCommand());
    input = reduce(input, prevCommand());
    expect(input.get("value")).toBe("1");
  });

  test("Save current command when browsing history", () => {
    input = reduce(input, type("0"));
    input = reduce(input, prevCommand());
    input = reduce(input, nextCommand());

    expect(input.get("value")).toBe("0");
  });

  test("Do not store duplicate command", () => {
    input = reduce(input, prevCommand());
    input = reduce(input, send());

    expect(input.get("history").toJS()).toEqual(["1", "2", "3", ""]);
  })
});