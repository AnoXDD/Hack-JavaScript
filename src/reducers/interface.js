import {
  COMMAND_CLS, COMMAND_HELP,
  COMMAND_RESET, MATCH_ANY
} from "../enum/Commands";
import INTERFACES from "../enum/Interfaces";
import {USER_INPUT} from "../enum/ActionType";

const HELP_NAME_LENGTH = 15;

/**
 * Wrapper around the original get method for immutable. This method
 * will also try to convert the value if it's a function
 * @param {Immutable.Map} immutable
 * @param key
 * @param param - the rest of parameters to be passed to the function
 */
function get(immutable, key, ...param) {
  let val = immutable.get("key");

  return typeof val === "function" ? val(...param) : val;
}

function trimCommand(cmd) {
  return cmd.split(" ").filter(c => c.length);
}

/**
 * Finds a command from a list
 * @param {Immutable.OrderedSet} list
 * @param {string} key
 * @param {boolean} findHidden - if it should find command that is
 *   meant to be hidden
 */
function findCommand(list, key, findHidden = true) {
  return list.find(c =>
    (findHidden || c.get("help")) &&
    c.get("match").includes(key))
    || list.find(c =>
      (findHidden || c.get("help")) &&
      c.get("match").includes(MATCH_ANY));
}

/**
 * Prints formatted list
 * @param list - arg list or command list
 * @return {string | *}
 */
function printList(list) {
  return list.filter(c => c.get("help"))
    .map(c => ` ${c.get("match")
      .join(" ")
      .concat(new Array(HELP_NAME_LENGTH).fill(" ").join(" "))
      .slice(0, HELP_NAME_LENGTH)} ${c.get("help")}`)
    .join("\n");
}

function printHelp(interf, name) {
  if (!name) {
    return "Use `help command' to find out more about command\n\n" +
      printList(interf.get("commands"));
  }

  let command = findCommand(interf.get("commands"), name, false);

  if (!command) {
    return `No help available for \`${name}'`;
  }

  return `${name}: ${command.get("help")}\n` +
    printList(command.get("args"));
}

/**
 * Prints output or executes the output
 * @param {*} output
 * @param val
 * @return {*}
 */
function execOutput(output, val) {
  return typeof output === "function" ? output(val) : output;
}

function execCommand(interf, command, cmd) {
  if (cmd.length === 1) {
    if (command.get("output") === null) {
      // Extra arg is required
      return interf.set("feedback",
        `More arguments required.\n` + printHelp(interf, cmd[0]));
    }

    let output = get(command,"output");
    let id = get(command,"interfaceId");
    id = typeof id === "function" ? id(cmd[0]) : id;

    return (INTERFACES[id] || interf)
      .set("feedback", execOutput(output, cmd[0]));
  }

  // With args, for now only accept one arg and its value
  let option = cmd[1];
  let val = cmd[2];

  let arg = findCommand(command.get("args"), option);

  // Invalid arg
  if (!arg) {
    return interf.set("feedback",
      `${option}: argument not found for ${cmd[0]}\n` +
      printHelp(interf, cmd[0]));
  }

  let output = get(arg,"output",val);
  let id = get(arg,"interfaceId",val);

  return (INTERFACES[id] || interf)
    .set("feedback", execOutput(output, val));
}

function execUniversalCommandIfNecessary(interf, cmd) {
  if (interf.get("property").get("prompt")) {
    return null;
  }

  switch (cmd[0]) {
    case COMMAND_HELP:
      return interf.set("feedback", printHelp(interf, cmd[1]));
    case COMMAND_CLS:
      return interf.set("feedback", COMMAND_CLS);
    case COMMAND_RESET:

    default:
      return null;
  }
}

/**
 * Reduces the command and the interface to a single interface
 * @param {Interface|Immutable.Map} interf - an interface to be
 *   reduced
 * @param {string} cmd
 * @return {Interface|Immutable.Map} null if `interf` cannot
 *   be reduced, or a reduced interface
 */
function reduceInterface(interf, cmd) {
  // Empty string
  cmd = trimCommand(cmd);

  if (!cmd.length) {
    return interf.set("feedback", "");
  }

  let e = execUniversalCommandIfNecessary(interf, cmd);
  if (e) {
    return e;
  }

  // Match commands
  // todo make match first letter work
  let command = findCommand(interf.get("commands"), cmd[0]);

  if (!command) {
    // Cannot recognize this command
    return interf.set("feedback", `${cmd[0]}: command not found`);
  }

  return execCommand(interf, command, cmd);
}

export default function reduce(state, action) {
  switch (action.type) {
    case USER_INPUT:
      return reduceInterface(state, action.value);
    default:
      return state;
  }
}