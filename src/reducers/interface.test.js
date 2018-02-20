import Immutable from "immutable";

import Interface, {
  CancelableInterface,
  PromptInterface
} from "../data/Interface";
import {send} from "../enum/Action";
import reduce from "./interface";
import INTERFACES from "../enum/Interfaces";
import Command from "../data/Command";

function a(i, cmd) {
  return reduce(i, send(cmd));
}

function ao(i, cmd) {
  let b = a(i, cmd);
  return b.get("feedback");
}

test("No input", () => {
  let i = new Interface({
    output: "dsaffasd",
  });

  expect(a(i, "         ").get("feedback")).toBe("");
  expect(a(i, "").get("feedback")).toBe("");
});

describe("With some commands", () => {
  let i = null;

  beforeEach(() => {
    i = INTERFACES.test;
  });

  describe("Help", () => {
    test("Normal help", () => {
      let s = ao(i, "help");

      expect(s.indexOf("a alias aliases")).not.toBe(-1);
      expect(s.indexOf("date")).not.toBe(-1);
      expect(s.indexOf("calc")).not.toBe(-1);
      expect(s.indexOf("echo")).not.toBe(-1);
      expect(s.indexOf("hidden")).toBe(-1);
      expect(s.indexOf("dummy")).not.toBe(-1);
      expect(s.indexOf("find out more about command"))
        .not
        .toBe(-1);
    });

    test("Help because of wrong command", () => {
      let str = ao(i, "sdfhauisahdfisahufid");

      expect(str.indexOf("command not found")).not.toBe(-1);
    });

    test("Help because of wrong arg", () => {
      // console.log(ao(i, "echo -sdfsfsdfsfsdfs"));
      expect(ao(i, "echo -sdfsfsdfsfsdfs")
        .indexOf("argument not found")).not.toBe(-1);
    });

    test("Help of a specific command", () => {
      expect(ao(i, "help date").indexOf("Show current date"))
        .not
        .toBe(-1);
    });

    test("Help of a specific command with args", () => {
      let str = ao(i, "help echo");
      expect(str.indexOf("Echoes something to console")).not.toBe(-1);
      expect(str.indexOf("Print it")).not.toBe(-1);
    });

    test("Help of a hidden command", () => {
      expect(ao(i, "help hidden").indexOf("No help available"))
        .not
        .toBe(-1);
    });

    test("Help of a non-exist command", () => {
      expect(ao(i, "help dfssfd").indexOf("No help available"))
        .not
        .toBe(-1);
    });
  });

  describe("alias", () => {
    test("a", () => {
      expect(ao(i, "a")).toBe("alias");
    });
    test("alias", () => {
      expect(ao(i, "alias")).toBe("alias");
    });
    test("aliases", () => {
      expect(ao(i, "aliases")).toBe("alias");
    })
  });

  test("Command with function: date", () => {
    expect(ao(i, "date")).toBe(new Date().getFullYear());
  });

  describe("Command with optional arg: echo", () => {
    test("Without arg", () => {
      expect(ao(i, "echo")).toBe("");
    });

    test("With arg", () => {
      expect(ao(i, "echo -s p")).toBe("p");
    });
  });

  describe("Command with required arg: calc", () => {
    test("Without arg", () => {
      expect(ao(i, "calc").indexOf("More arguments required"))
        .not
        .toBe(-1);
    });

    test("arg whose output is function", () => {
      expect(ao(i, "calc -d 3")).toBe(2);
    });

    test("arg whose output is string", () => {
      expect(ao(i, "calc -z")).toBe(0);
    });
  });

  test("Hidden command", () => {
    expect(ao(i, "hidden")).toBe("hidden");
  });

  describe("Jump to other interface", () => {
    test("When command id is null", () => {
      expect(a(i, "a").get("id")).toBe("test");
    });

    test("When arg id is null", () => {
      expect(a(i, "echo -s p").get("id")).toBe("test");
    });

    test("When command id is not null", () => {
      expect(a(i, "dummy").get("id")).toBe("DUMMY");
    });

    test("When command id is not null but arg is", () => {
      expect(a(i, "dummy -n").get("id")).toBe("test");
    });

    test("When command id is not null and so is arg", () => {
      expect(a(i, "dummy -d").get("id")).toBe("DUMMY");
    });
  });
});

describe("Cancelable interface", () => {
  test("Normal interface", () => {
    let c = CancelableInterface(INTERFACES.test.set("parentId",
      "DUMMY"), [".."], "back");

    let i = a(c, "..");

    expect(i.get("feedback")).toBe("back");
    expect(i.get("id")).toBe("DUMMY");
  });

  test("Interface with command as callback function", () => {
    let now = Date.now() - 2000;
    let intf = new Interface({
      id      : "local",
      parentId: "DUMMY",
      commands: () => Immutable.List([
        new Command({
          match      : Immutable.OrderedSet([now > Date.now() ? "yes" : "no"]),
          help       : "",
          output     : "yes",
          interfaceId: null,
        }),
      ])
    });

    now = Date.now() + 2000000;

    let c = CancelableInterface(intf, [".."], "back");

    // Test the match method is actually called when reduced
    expect(ao(c, "yes")).toBe("yes");

    // Test back
    let back = a(c, "..");
    expect(back.get("feedback")).toBe("back");
    expect(back.get("id")).toBe("DUMMY");
  })
});


describe("Prompt interface", () => {
  let p = null;

  beforeEach(() => {
    p = PromptInterface({
      source: "test",
      prompt: "prompt",
      target: "DUMMY"
    }, ["y"], {success: "success", fail: "fail"}, "y/n", true);
  });

  test("Property set correctly", () => {
    let prop = p.get("property");

    expect(prop.get("header")).toBe("y/n");
    expect(prop.get("password")).toBeTruthy();
  });

  test("Success", () => {
    let i = a(p, "y");

    expect(i.get("id")).toBe("DUMMY");
    expect(i.get("feedback")).toBe("success");
  });

  test("Fail", () => {
    // Match any
    let i = a(p, "fsdaasdf");

    expect(i.get("id")).toBe("test");
    expect(i.get("feedback")).toBe("fail");
  });

  test("Fail on help", () => {
    let i = a(p, "help");

    expect(i.get("id")).toBe("test");
    expect(i.get("feedback")).toBe("fail");
  });

  test("Fail on cls", () => {
    let i = a(p, "cls");

    expect(i.get("id")).toBe("test");
    expect(i.get("feedback")).toBe("fail");
  });
});
