import Immutable from "immutable";

import {USER_LIST} from "./Names";
import {
  getMailCommandId,
  getMailContent,
  getMailSnapshot
} from "../util";
import Command from "../data/Command";
import Arg from "../data/Arg";

const COMMANDS = {
  // Mailboxes
  ...USER_LIST.reduce((commands, user) => {
    commands[getMailCommandId(user)] = new Command({
      match      : Immutable.OrderedSet("mail".split(" ")),
      help       : "View the emails sent and received",
      output     : () => getMailSnapshot(user),
      interfaceId: null,
      args       : Immutable.List([
        new Arg({
          match      : Immutable.Set("-v".split(" ")),
          help       : "See the detail of an email",
          output     : id => getMailContent(user, id),
          interfaceId: null,
        })
      ]),
    });

    return commands;
  }, {}),
};

export default COMMANDS;