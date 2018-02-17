import store from "../store";
import {ME, SSH_OUTPUT} from "../enum/Names";

export function printLog() {
  store.getState();
  return "Todo: will print log later";
}

export function getHomeId() {
  return "HOME_INITIAL";
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

export function getInternalInterfaceId() {
  return "INTERNAL_PLAYER";
}

export function getMailCommandId(id) {
  return `MAIL_${id}`;
}

export function getMailSnapshot(id) {
  let list = store.getState().mailbox.get(id);

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

  let mailbox = store.getState().mailbox.get(userId);

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


export function trimWithEllipsis(str, n = window.charLimit) {
  return str.substr(0, n - 1) + (str.length > n ? '&hellip;' : '');
}