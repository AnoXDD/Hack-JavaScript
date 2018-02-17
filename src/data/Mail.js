import Immutable from "immutable";

export function getSenderMail(mail) {
   return mail.set("read", true);
}

const Mail = new Immutable.Record({
  from   : "",
  to     : "",
  content: "",
  date   : null,
  read   : false,
}, "Mail");

export default Mail;