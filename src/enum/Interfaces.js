import Immutable from "immutable";

import STRING, {
  ACTUAL_GAME_WELCOME, SSH_PROP,
  USER_LOGGED_OUT
} from "./String";
import Interface, {
  CancelableInterface,
  PromptInterface
} from "../data/Interface";
import Command from "../data/Command";
import Arg from "../data/Arg";
import {
  getHomeCommands,
  getHomeId,
  getInternalCommandList,
  getInternalInterfaceId,
  getSshLoginInterfaceId,
  getSshLoginOutput
} from "../util";
import { USER_LIST} from "./Names";
import PASSWORDS from "./Passwords";

const INTERFACES = {
  // region test
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
  // endregion

  // region Intro
  "INTRO_WELCOME"    : new Interface({
    id      : "INTRO_WELCOME",
    commands: Immutable.List([
      new Command({
        match      : Immutable.Set("next".split(" ")),
        help       : "Go to next paragraph",
        output     : STRING.INTRO_PARAM,
        interfaceId: "INTRO_PARAM",
      }),
      new Command({
        match      : Immutable.OrderedSet("skip".split(" ")),
        help       : "Skip the tutorial and start the game",
        output     : ACTUAL_GAME_WELCOME,
        interfaceId: "HOME",
        args       : Immutable.List([]),
      }),
      new Command({
        match      : Immutable.Set("test".split(" ")),
        output     : "TEST",
        interfaceId: "test",
      })
    ]),
    parentId: "",
  }),
  "INTRO_PARAM"      : new Interface({
    id      : "INTRO_PARAM",
    commands: Immutable.List([new Command({
      match : Immutable.Set("next".split(" ")),
      help  : "Go to next paragraph, but requires an argument",
      output: null,
      args  : Immutable.List([new Arg({
        match      : Immutable.Set("-p".split(" ")),
        help       : "Go to next paragraph",
        output     : STRING.INTRO_PARAM_GUESS,
        interfaceId: "INTRO_PARAM_GUESS",
      })]),
    })]),
    parentId: "",
  }),
  "INTRO_PARAM_GUESS": new Interface({
    id      : "INTRO_PARAM_GUESS",
    commands: Immutable.List([new Command({
      match      : Immutable.Set("next".split(" ")),
      help       : "Go to next paragraph",
      output     : STRING.INTRO_END,
      interfaceId: "INTRO_END",
    })]),
    parentId: "",
  }),
  "INTRO_END"        : new Interface({
    id      : "INTRO_END",
    commands: Immutable.List([new Command({
      match      : Immutable.OrderedSet("start".split(" ")),
      help       : "Start playing the game",
      output     : ACTUAL_GAME_WELCOME,
      interfaceId: "HOME",
    })]),
    parentId: "",
  }),
  // endregion

  // region Home
  "HOME": new Interface({
    id      : "HOME",
    commands: () => getHomeCommands(),
    parentId: "",
  }),
  // endregion

  // region SSH
  ...USER_LIST.reduce((intf, id) => {
    intf[id] = PromptInterface({
      source: () => getHomeId(),
      prompt: () => getSshLoginInterfaceId(id),
      target: () => getInternalInterfaceId(id),
    }, [PASSWORDS[id]], () => getSshLoginOutput(id), ...SSH_PROP);

    return intf;
  }, {}),
  // endregion

  // region Internal
  ...USER_LIST.reduce((intf, id) => {
    intf[id] = CancelableInterface(
      new Interface({
        id      : getInternalInterfaceId(id),
        commands: () => getInternalCommandList(id),
        parentId: () => getHomeId(),
      }), ["out"], USER_LOGGED_OUT);

    return intf;
  }, {}),
  // endregion

  // region Mailboxes

  // endregion
};

export default INTERFACES;