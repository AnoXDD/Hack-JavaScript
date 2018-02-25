import Immutable from "immutable";

import {USER_LIST} from "./Names";
import {
  acceptRequest, bookRequest, cancelRequest,
  getMailCommandId,
  getMailContent,
  getMailSnapshot, getRequestCommandId, getRequestSnapshot,
  getUnreadMailContent
} from "../util";
import Command from "../data/Command";
import Arg from "../data/Arg";
import {COMMAND_REQUEST} from "./String";

const COMMANDS = {
  // Mailboxes
  ...USER_LIST.reduce((commands, user) => {
    commands[getMailCommandId(user)] = new Command({
      match      : Immutable.OrderedSet("mail".split(" ")),
      help       : "Check the emails",
      output     : () => getMailSnapshot(user),
      interfaceId: null,
      args       : Immutable.List([
        new Arg({
          match      : Immutable.Set("-u".split(" ")),
          help       : "Read the new (unread) email (if any)",
          output     : () => getUnreadMailContent(user),
          interfaceId: null,
        }),
        new Arg({
          match      : Immutable.Set("-r".split(" ")),
          help       : "Read the a specific email",
          output     : id => getMailContent(user, id),
          interfaceId: null,
        })
      ]),
    });

    return commands;
  }, {}),

  // Requests
  ...USER_LIST.reduce((commands, user) => {
    commands[getRequestCommandId(user)] = new Command({
      match      : Immutable.OrderedSet(COMMAND_REQUEST.split(" ")),
      help       : "View and process the request",
      output     : () => getRequestSnapshot(user),
      interfaceId: null,
      args       : Immutable.List([
        new Arg({
          match      : Immutable.Set("-a".split(" ")),
          help       : "Accepts the current request",
          output     : () => acceptRequest(user),
          interfaceId: null,
        }),
        new Arg({
          match      : Immutable.Set("-b".split(" ")),
          help       : "Books a request with someone",
          output     : () => bookRequest(),
          interfaceId: null,
        }),
        new Arg({
          match      : Immutable.Set("-c".split(" ")),
          help       : "Cancels the current request",
          output     : () => cancelRequest(user),
          interfaceId: null,
        }),
      ]),
    });

    return commands;
  }, {}),
};

export default COMMANDS;