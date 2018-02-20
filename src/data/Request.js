import Immutable from "immutable";

const Request = new Immutable.Record({
  owner : "",
  status: "",
  title : "",
}, "Request");

export default Request;