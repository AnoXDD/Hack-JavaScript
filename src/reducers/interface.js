import {COMMAND_HELP} from "../enum/Commands";
import INTERFACES from "../enum/Interfaces";
import {USER_INPUT} from "../enum/ActionType";

const HELP_NAME_LENGTH = 15;

function trimCommand(cmd) {
  return cmd.split(" ").filter(c => c.length);
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
    return printList(interf.get("commands")) +
      "\n\nUse `help command' to find out more about command";
  }

  let command = interf.get("commands")
    .find(c => c.get("help") && c.get("match").includes(name));

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
function execOutput(output,val) {
  return typeof output === "function" ? output(val) : output;
}

function execCommand(interf, command, cmd) {
  if (cmd.length === 1) {
    if (command.get("output") === null) {
      // Extra arg is required
      return interf.set("output",
        `More arguments required.\n` + printHelp(interf, cmd[0]));
    }

    let output = command.get("output");

    return (INTERFACES[command.get("interfaceId")] || interf)
      .set("output", execOutput(output, cmd[0]));
  }

  // With args, for now only accept one arg and its value
  let option = cmd[1];
  let val = cmd[2];

  let arg = command.get("args")
    .find(a => a.get("match").includes(option));

  // Invalid arg
  if (!arg) {
    return interf.set("output",
      `${option}: argument not found for ${cmd[0]}.\n` +
      printHelp(interf, cmd[0]));
  }

  let output = arg.get("output");

  return (INTERFACES[arg.get("interfaceId")] || interf)
    .set("output", execOutput(output, val));
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
    return interf.set("output", "");
  }

  // Print help
  if (cmd[0] === COMMAND_HELP) {
    return interf.set("output", printHelp(interf, cmd[1]));
  }

  // Match commands
  // todo make match first letter work
  let command = interf.get("commands")
    .find(c => c.get("match").includes(cmd[0]));

  if (!command) {
    // Cannot recognize this command
    return interf.set("output", `${cmd[0]}: command not found`);
  }

  return execCommand(interf, command, cmd);
}

export default function reduce(state = INTERFACES.test,
                               action) {
  switch (action.type) {
    case USER_INPUT:
      return reduceInterface(state, action.value);
    default:
      return state;
  }
}