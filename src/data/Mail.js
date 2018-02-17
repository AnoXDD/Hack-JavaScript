import Immutable from "immutable";

/**
 * Reverses the sender and receiver of the mail and mark the new mail
 * as read
 * @param mail
 */
export function getSenderMail(mail) {
  let from = mail.get("from");
  let to = mail.get("to");

  return mail.set("to", from).set("from", to).set("read", true);
}

const Mail = new Immutable.Record({
  from   : "",
  to     : "",
  date   : null,
  content: "",
  read   : false,
}, "Mail");

export default Mail;