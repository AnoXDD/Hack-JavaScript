import Immutable from "immutable";

/**
 * Reverses the sender and receiver of the mail
 * @param mail
 */
export function reverseMail(mail) {
  let from = mail.get("from");
  let to = mail.get("to");

  return mail.set("to", from).set("from", to);
}

const Mail = new Immutable.Record({
  from: "",
  to: "",
  date: 0,
  content: "",
}, "Mail");

export default Mail;