import {ME} from "./Names";

const STRING = {
  INTRO_WELCOME    : "Welcome to Hack, a console-based puzzle game, where the whole game experience will be involved with this terminal thing. Playing this game will sound easy if you ever used `cmd.exe' on Windows or `Terminal' on Mac, but even if you don't, we will go over the basics right now. \n\n" +
  "In this game we call this console `adapter.' To interact with adapter, you are required to type commands below (the line starting with a >) each time you ask it to do something. For example, type `next' and press ENTER on your keyboard to see further instructions. Bear with me if you ever used command line before.",
  INTRO_PARAM      : "Great! Besides a single word, sometimes the command can be combined with some parameters. When this happens, you can type the command following a space, a dash (-) and the parameter. For example, try `next -p'.",
  INTRO_PARAM_GUESS: "Excellent! Now you have acquired what is necessary to play this game. This game includes a story waiting you to discover, and it also requires your knowledge to decipher each valuable information after every piece of message you have seen. Good luck!",
  INTRO_END        : "Good! You have successfully guess what to enter to let the adapter show what you want to see. In case you don't know, `help' will bring up all available commands. Type `start' now to start the actual game",
};

export const ACTUAL_GAME_WELCOME = `Initializing ...\nWelcome, ${ME}`;

export const MAIL_EMPTY = "You have no email right now";
export const MAIL_NO_UNREAD = "You have no new email right now";
export const REQUEST_EMPTY = "You have no request right now";
export const USER_LOGGED_OUT = "You have successfully logged out";

// region command
export const COMMAND_HELP = "help";
export const COMMAND_CLS = "cls";
export const COMMAND_RESET = "reset";
export const COMMAND_REQUEST = "req";
export const MATCH_ANY = "";
// endregion

export const SSH_OUTPUT = {
  fail: "Username and password does not match",
};
export const PASSWORD_HEADER = "Password: ";
export const SSH_PROP = [PASSWORD_HEADER, true];

export default STRING;
