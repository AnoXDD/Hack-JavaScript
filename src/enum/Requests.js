import {
  ALT_NEW_JOB_DESCRIPTION,
  ANONYMOUS_FIRST_EMAIL, MANAGER_OFFER_NEW_PLUGIN, PROMOTION_ACCEPTED,
  PROMOTION_OFFER_VIEWED,
  PROMOTION_RECEIVED, RESIGNATION_BOOKED,
  RESIGNATION_CANCELED, SPY_OFFERED_PLUGIN
} from "./Checkpoint";
import Request from "../data/Request";
import {COMPANY, COMPANY_ALT, MANAGER, ME, ME_ALT} from "./Names";

const REQUESTS = {
  [RESIGNATION_BOOKED]      : new Request({
    owner : ME,
    status: "Processing",
    title : "Short talk with manager",
  }),
  [ANONYMOUS_FIRST_EMAIL]   : new Request({
    owner : ME,
    status: "Canceled",
    title : "Short talk with manager",
  }),
  [PROMOTION_RECEIVED]      : new Request({
    owner : ME,
    status: "Received",
    title : "Promotion: confidential work",
  }),
  [PROMOTION_OFFER_VIEWED]  : new Request({
    owner : ME,
    status: "Received",
    title : `Plugin: ${COMPANY_ALT} access`,
  }),
  [ALT_NEW_JOB_DESCRIPTION] : new Request({
    owner : ME_ALT,
    status: "Received",
    title : `Plugin: ${COMPANY_ALT} new job`,
  }),
  [SPY_OFFERED_PLUGIN]      : new Request({
    owner : ME_ALT,
    status: "Received",
    title : `Plugin: ${COMPANY} elevated access`,
  }),
  [MANAGER_OFFER_NEW_PLUGIN]: new Request({
    owner : ME,
    status: "Received",
    title : `Plugin: ${COMPANY_ALT} access v2`,
  }),
};

export default REQUESTS;