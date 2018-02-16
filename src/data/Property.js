import Immutable from "immutable";

const Property = new Immutable.Record({
  // The style of the command line header
  header  : "> ",
  // If the command line should be a password
  password: false,
  // If current interface is a prompt, doing so will disable
  // universal commands
  prompt  : false,
}, "Property");

export default Property;