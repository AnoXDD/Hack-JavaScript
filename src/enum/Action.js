import {
  APPLY_CHECKPOINT,
  RESET,
  UPDATE_CHECKPOINT,
  USER_BACKSPACE,
  USER_INPUT,
  USER_NEXT_COMMAND,
  USER_PREV_COMMAND,
  USER_TYPE
} from "./ActionType";
import store from "../store";
import {getCurrentInterfaceId, getLastExecutedCommand} from "../util";
import {CHECKPOINT_LIST} from "./Checkpoint";

export function type(letter) {
  return {
    type: USER_TYPE,
    letter,
  };
}

export function backspace(deleteWord = false) {
  return {
    type: USER_BACKSPACE,
    deleteWord,
  };
}

export function send(value = store.getState().input.get("value"),
                     from = store.getState()
                       .output
                       .get("interface")
                       .get("id")) {
  return {
    type: USER_INPUT,
    value,
    from,
  };
}

export function prevCommand() {
  return {
    type: USER_PREV_COMMAND,
  };
}

export function nextCommand() {
  return {
    type: USER_NEXT_COMMAND,
  };
}

/**
 * Returns an action to update the checkpoint
 * @param checkpoint
 * @param {string|boolean} interfaceIdOrForceUpdate - string for the
 *   interface id, or boolean to force update the reducer (ignore
 *   interface id and commands_
 * @param {string} command - the last executed command
 * @return {{type, checkpoint: *|reduce, interfaceId: *, command: *,
 *   forceUpdate: boolean}}
 */
export function updateCheckpoint(checkpoint = store.getState().checkpoint,
                                 interfaceIdOrForceUpdate = getCurrentInterfaceId(),
                                 command = getLastExecutedCommand()) {
  let forceUpdate = false;
  if (typeof interfaceIdOrForceUpdate === "boolean") {
    forceUpdate = interfaceIdOrForceUpdate;
  }

  return {
    type       : UPDATE_CHECKPOINT,
    checkpoint,
    interfaceId: interfaceIdOrForceUpdate,
    command,
    forceUpdate,
  };
}

/**
 * Resets the game and force the current checkpoint to be the one
 * provided
 * @param {function} dispatch - the dispatch function
 * @param checkpoint
 * @return {{type}}
 */
export function applyCheckpoint(dispatch, checkpoint) {
  if (!CHECKPOINT_LIST.includes(checkpoint)) {
    console.warn(`Action.js ${arguments.callee.name}: ${checkpoint} is not a valid checkpoint`);
    return updateCheckpoint();
  }

  return dispatch => {
    dispatch(reset());

    // Iterate over all the checkpoints until it hits checkpoint
    // provided
    for (let cp of CHECKPOINT_LIST) {
      dispatch(updateCheckpoint(cp, true));

      if (cp === checkpoint) {
        return;
      }
    }
  }
}

export function reset() {
  return {
    type: RESET,
  };
}