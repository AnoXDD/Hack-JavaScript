/*
 A class to store current available commands
 */

import Immutable from "immutable";
import Property from "./Property";
import Command from "./Command";

const Interface = new Immutable.Record({
  id      : null,
  // A list of available commands, excluding "help"
  commands: Immutable.List(),
  // The id of parent interface
  parentId: null,
  // String only. What will be printed to the console. This field is
  // supposed to be set by the reducer, not by the user
  feedback: "",
  property: new Property()
}, "Interface");

/**
 * Creates a cancelable interface, which can go to whoever called it
 * (specified by parentId)
 * @param {Interface|Immutable.Map} interf
 * @param {Array} match - command to be matched
 * @param {*} output - function or string to be output
 * @constructor
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

export function PromptInterface(id) {
  return new Interface({
    id: id,

  })
}

export default Interface;