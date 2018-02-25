import {RESET, UPDATE_CHECKPOINT} from "../enum/ActionType";
import {TUTORIAL} from "../enum/Checkpoint";

function updateCheckpoint(checkpoint, interfaceId, command) {
  console.log(checkpoint, interfaceId, command);

  return checkpoint;
}

const INITIAL_STATE = TUTORIAL;

export default function reduce(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET:
      return INITIAL_STATE;

    case UPDATE_CHECKPOINT:
      let {checkpoint, interfaceId, command} = action;

      return updateCheckpoint(checkpoint, interfaceId, command);
    default:
      return state;
  }
};