/*
 A class to store current available commands
 */

import Immutable from "immutable";
import Property from "./Property";
import Command from "./Command";
import {MATCH_ANY} from "../enum/Commands";

const Interface = new Immutable.Record({
  id      : null,
  // A list of available commands, excluding "help"
  commands: Immutable.List(),
  // The id of parent interface
  parentId: null,
  // String only. What will be printed to the console. This field is
  // supposed to be set by the reducer, not by the user
  feedback: "",
  property: new Property(),
}, "Interface");

/**
 * Creates a cancelable interface, which can go to whoever called it
 * (specified by parentId)
 * @param {Interface|Immutable.Record} interf
 * @param {Array} match - command to be matched
 * @param {*} output - function or string to be output
 */
export function CancelableInterface(interf, match, output) {
  let command = new Command({
    match      : Immutable.OrderedSet(match),
    help       : "Go back",
    output     : output,
    interfaceId: interf.get("parentId"),
  });

  // Prepend it
  let newCommands = [command, ...interf.get("commands").toArray()];

  return interf.set("commands", newCommands);
}

/**
 * Creates a prompt interface, which acts like a prompt
 *   command doesn't match
 * @param {{source: *, target: *, prompt: *}} ids -
 *   the ids of interfaces
 * @param {Array} match - command to be matched
 * @param {{success: *, fail: *}} output - what to output
 *   if command is a match or not
 * @param {String} header - what to show as a prompt
 * @param {boolean} password - if the prompt should be considered
 *   password
 */
export function PromptInterface(ids,
                                match,
                                output,
                                header = ">",
                                password = false) {
  let {source, target, prompt} = ids;
  let {success = "", fail = ""} = output;

  return CancelableInterface(new Interface({
    id      : prompt,
    commands: Immutable.List([
      new Command({
        match      : Immutable.OrderedSet(match),
        output     : success,
        interfaceId: target,
      }),
    ]),
    parentId: source,
    property: new Property({
      header,
      password,
      prompt: true,
    })
  }), [MATCH_ANY], fail);
}

export default Interface;