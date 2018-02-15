import Immutable from "immutable";

import STRING from "./String";
import Interface from "../data/Interface";
import Command from "../data/Command";
import Arg from "../data/Arg";

const INTERFACES = {
  "DUMMY": new Interface({
    id      : "DUMMY",
    commands: Immutable.List([]),
    parentId: "",
  }),
  "test" : new Interface({
    id      : "test",
    commands: Immutable.List([
      new Command({
        match      : Immutable.Set("a alias aliases".split(" ")),
        help       : "Just two commands to be matched",
        output     : "alias",
        interfaceId: null,
        args       : Immutable.List([]),
      }),
      new Command({
        match      : Immutable.Set("date".split(" ")),
        help       : "Show current date",
        output     : () => (new Date()).getFullYear(),
        interfaceId: null,
        args       : Immutable.List([]),
      }),
      new Command({
        match      : Immutable.Set("echo".split(" ")),
        help       : "Echoes something to console",
        output     : "",
        interfaceId: null,
        args       : Immutable.List([
          new Arg({
            match      : Immutable.Set("-s".split(" ")),
            help       : "Print it",
            output     : val => val,
            interfaceId: null,
          })
        ]),
      }),
      new Command({
        match      : Immutable.Set("calc".split(" ")),
        help       : "Calculates",
        output     : null,
        interfaceId: null,
        args       : Immutable.List([
          new Arg({
            match      : Immutable.Set("-i".split(" ")),
            help       : "Increment by 1",
            output     : val => Number(val) + 1,
            interfaceId: null,
          }),
          new Arg({
            match      : Immutable.Set("-d".split(" ")),
            help       : "Decrements by 1",
            output     : val => Number(val) - 1,
            interfaceId: null,
          }),
          new Arg({
            match      : Immutable.Set("-z".split(" ")),
            help       : "Prints zero",
            output     : 0,
            interfaceId: null,
          })
        ]),
      }),
      new Command({
        match      : Immutable.Set("hidden".split(" ")),
        help       : null,
        output     : "hidden",
        interfaceId: null,
        args       : Immutable.List([]),
      }),
      new Command({
        match      : Immutable.Set("dummy".split(" ")),
        help       : "Go to",
        output     : "Goes to dummy",
        interfaceId: "DUMMY",
        args       : Immutable.List([
          new Arg({
            match      : Immutable.Set("-d".split(" ")),
            help       : "",
            output     : "",
            interfaceId: "DUMMY",
          }),
          new Arg({
            match      : Immutable.Set("-n".split(" ")),
            help       : "",
            output     : "",
            interfaceId: null,
          })
        ]),
      })
    ]),
    parentId: "",
  }),

  "INTRO_WELCOME"    : new Interface({
    id      : "INTRO_WELCOME",
    commands: Immutable.List([new Command({
      match      : Immutable.Set("next".split(" ")),
      output     : STRING.INTRO_WELCOME,
      interfaceId: "INTRO_PARAM",
    })]),
    parentId: "",
  }),
  "INTRO_PARAM"      : new Interface({
    id      : "INTRO_PARAM",
    commands: Immutable.List([new Command({
      match : Immutable.Set("next".split(" ")),
      output: null,
      args  : Immutable.List([new Arg({
        match      : Immutable.Set("-p".split(" ")),
        output     : STRING.INTRO_PARAM,
        interfaceId: "INTRO_PARAM_GUESS",
      })]),
    })]),
    parentId: "",
  }),
  "INTRO_PARAM_GUESS": new Interface({
    id      : "INTRO_PARAM_GUESS",
    commands: Immutable.List([new Command({
      match      : Immutable.Set("next".split(" ")),
      output     : STRING.INTRO_PARAM_GUESS,
      interfaceId: "INTRO_END",
    })]),
    parentId: "",
  }),
};

export default INTERFACES;