import Immutable from "immutable";

import Dynamics from "../data/Dynamics";
import {RESET, UPDATE_CHECKPOINT} from "../enum/ActionType";
import MAILS from "../enum/Mails";
import {getSenderMail} from "../data/Mail";
import {RESIGNATION_BOOKED} from "../enum/Checkpoint";
import {ME_COMPANY} from "../enum/Names";
import REQUESTS from "../enum/Requests";

/**
 * Processes request with a checkpoint
 * @param checkpoint
 */
function processRequest(checkpoint) {
  return REQUESTS[checkpoint] || null;
}

function sendMail(mailbox, m) {
  // Set date
  if (!m.get("date")) {
    m = m.set("date", Date.now());
  }

  let to = m.get("to");
  let from = m.get("from");

  // Receive
  let list = mailbox.get(to) || Immutable.List();
  list = list.push(m);
  mailbox.set(to, list);

  m = getSenderMail(m);
  list = mailbox.get(from) || Immutable.List();
  list = list.push(m);
  mailbox.set(from, list);

  return mailbox;
}

/**
 * Processes mails with a map of mailboxes
 * @param {Immutable.Map} mailbox
 * @param {string|Array} mails
 */
function processMails(mailbox, mails) {
  // Force mark as array
  if (!Array.isArray(mails)) {
    mails = [mails];
  }

  for (let m of mails) {
    mailbox = sendMail(mailbox, m);
  }

  return mailbox;
}

const INITIAL_STATE = new Dynamics();

export default function reduce(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET:
      return INITIAL_STATE;
    case UPDATE_CHECKPOINT:
      let {checkpoint, forceUpdate} = action;

      if (checkpoint <= state.get("checkpoint") && !forceUpdate) {
        return state;
      }

      let request = processRequest(checkpoint);

      let mail = MAILS[checkpoint];
      if (!mail) {
        return state;
      }

      let mailbox = processMails(state.get("mailbox"), mail);

      return state.set("mailbox", mailbox)
        .set("request", request)
        .set("checkpoint", action.checkpoint);

    default:
      return state;
  }
};