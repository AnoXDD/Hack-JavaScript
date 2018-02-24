import Immutable from "immutable";

import store from "../store";
import {MANAGER, ME, SSH_OUTPUT} from "../enum/Names";
import Interface from "../data/Interface";
import COMMANDS from "../enum/Commands";
import {INTERNAL_PASSWORD_ACQUIRED} from "../enum/Checkpoint";

export function printLog() {
  store.getState();
  return "Todo: will print log later";
}

export function getHomeId() {
  return "HOME";
}

export function getSshOutput(name) {
  switch (name) {
    case ME:
      return `User: ${name}`;
    default:
      return `${name}: user not found`;
  }
}

export function getSshLoginInterfaceId(userId) {
  // todo if user changed password, redirect userId here
  return `SSH_${userId}`;
}

export function getSshLoginOutput(userId) {
  // todo if user requires special plugin, check it here
  return {
    success: `Welcome, ${userId}`,
    ...SSH_OUTPUT,
  };
}

export function getInternalInterfaceId(id) {
  return `INTERNAL_${id}`;
}

export function getRequestCommandId(id) {
  return `REQUEST_${id}`;
}

function _getCurrentRequest(id) {
  let request = store.getState().dynamics.get("request");
  if (!request || request.get("owner") !== id) {
    return null;
  }

  return request;
}

export function getRequestSnapshot(id) {
  let request = _getCurrentRequest(id);
  if (!request) {
    return "You have no request right now";
  }

  return `You have an open request.
  
Status: ${request.get("status")}
${request.get("title")}`;
}

export function acceptRequest(id) {
  let request = _getCurrentRequest(id);
  if (!request) {
    return "You have no request right now";
  }

  if (request.get("status") !== "Received") {
    return "You can't accept this request";
  }

  return "Request accepted";
}

export function bookRequest() {
  if (getCurrentCheckpoint() === INTERNAL_PASSWORD_ACQUIRED) {
    return `You have booked a meeting with ${MANAGER}`;
  }

  return "Everyone is busy right now :)";
}

export function cancelRequest(id) {
  let request = _getCurrentRequest(id);
  if (!request) {
    return "You have no request right now";
  }

  if (request.get("status") !== "Processing") {
    return "You can't cancel this request";
  }

  return "Request canceled";
}

export function getMailCommandId(id) {
  return `MAIL_${id}`;
}

export function getMailSnapshot(id) {
  let list = store.getState().dynamics.get("mailbox").get(id);

  if (!list) {
    return "You have no email right now";
  }

  let unread = list.filter(m => !m.get("read")).length;
  let header = unread ? `You have ${unread} unread email${unread === 1 ? "" : "s"}\n` : "";

  return header + "&uarr; means an email sent. &darr; means an email received\n\n" +
    " id   from/to    content\n" +
    list.reverse()
      .map((m, i) => {
        let mailId = `${i + 1} `.substr(0, 2);
        let isRead = m.get("read") ? "*" : " ";
        let isSender = m.get("from") === id;
        let sendSign = isSender ? "&uarr;" : "&darr;";
        let person = trimWithEllipsis(
          isSender ? m.get("to") : m.get("from"), 10);
        let content = m.get("content");

        return trimWithEllipsis(`${isRead}${mailId} ${sendSign} ${person} ${content}`);
      }).join("\n") + `

Use \`-v [id]' to see the detail of an email`;
}

export function getMailContent(userId, mailId) {
  if (mailId === undefined) {
    return "Use `-v [id]' to see the detail of an email";
  }

  let mailbox = store.getState().dynamics.get("mailbox").get(userId);

  if (!mailbox) {
    // Hmm this is not supposed to be happening
    return "Invalid user session. This is probably a bug from the game...";
  }

  let mail = mailbox.get(mailId);
  if (!mail) {
    return `${mailId} is not a valid id`;
  }

  return `Date: ${mail.get("date").toLocaleString()}
From: ${mail.get("from")}
To: ${mail.get("to")}
Content: 
${mail.get("content")}
`;
}

/**
 * @param id
 * @return {Immutable.List}
 */
export function getInternalCommandList(id) {
  let extra = [];

  switch (id) {
    case ME:
      extra = [];
      break;
  }

  return Immutable.List([
    COMMANDS[getMailCommandId(id)],
    ...extra
  ])
}

export function getCurrentCheckpoint() {
  return store.getState().checkpoint;
}

export function trimWithEllipsis(str, n = window.charLimit) {
  return str.substr(0, n - 1) + (str.length > n ? '&hellip;' : '');
}

export function getCurrentInterfaceId(state = store.getState()) {
  return state.output.get("interface").get("id");
}

export function getLastExecutedCommand(state = store.getState()) {
  return (state.output.get("handshakes").last() || new Interface())
    .get("input");
}

