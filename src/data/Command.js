import Immutable from "immutable";

const Command = new Immutable.Record({
  // Matches these commands
  match      : Immutable.OrderedSet(),
  // Explain what this command does, set to `null` to keep it as a secret
  help       : null,
  // Outputs this or callback function this when this command is
  // executed. Set this to null to disable no-arg for this command
  output     : null,
  // Go to this `Interface` when this command is executed, null to
  // stay where it is
  interfaceId: null,
  // (optional) A list of `Arg`
  args       : Immutable.List(),
}, "Command");

export default Command;