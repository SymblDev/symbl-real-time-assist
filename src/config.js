export const apiBase =
  process.env.REACT_APP_SYMBL_CUSTOM_DOMAIN || "https://api-labs.symbl.ai";
export const symblAppId = "";
export const symblAppSecret = "";
export const summaryEmails = process.env.REACT_APP_SUMMARY_EMAIL_LIST
  ? process.env.REACT_APP_SUMMARY_EMAIL_LIST.replace(/\s/g, "").split(",")
  : [];
export const twilioBridgeSubscriptionUrl =
  "wss://5953-122-172-87-54.in.ngrok.io/symbl/updates";

export const intents = [
  { intent: "answering_machine" },
  { intent: "interested" },
  { intent: "not_interested" },
  { intent: "do_not_call" },
];

export const statsTrackers = [
  "Symbl.Politeness",
  "Symbl.Empathy",
  "Symbl.Dissatisfaction",
  "Satisfaction",
  "Frustration",
];
