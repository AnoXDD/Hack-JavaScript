import Immutable from "immutable";

import Mailbox from "../data/Mailbox";
import {SET_CHECKPOINT} from "../enum/ActionType";
import MAILS from "../enum/Mails";
import {getSenderMail} from "../data/Mail";

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

export default function reduce(state = new Mailbox(), action) {
  switch (action.type) {
    case SET_CHECKPOINT:
      if (action.checkpoint <= state.get("checkpoint")) {
        return state;
      }

      let mail = MAILS[action.checkpoint];
      if (!mail) {
        return state;
      }

      let mailbox = processMails(state.get("mailbox"), mail);

      return state.set("mailbox", mailbox)
        .set("checkpoint", action.checkpoint);

    default:
      return state;
  }
};