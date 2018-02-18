import {UPDATE_CHECKPOINT} from "../enum/ActionType";
import {TUTORIAL} from "../enum/Checkpoint";

function updateCheckpoint(checkpoint, interfaceId, command) {
  console.log(checkpoint, interfaceId, command);

  return checkpoint;
}

export default function reduce(state = TUTORIAL, action) {
  switch (action.type) {
    case UPDATE_CHECKPOINT:
      let {checkpoint, interfaceId, command} = action;

      return updateCheckpoint(checkpoint, interfaceId, command);
    default:
      return state;
  }
};