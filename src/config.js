export const apiBase =
  process.env.REACT_APP_SYMBL_CUSTOM_DOMAIN || "https://api-labs.symbl.ai";
export const symblAppId =
  "6f365733504b7548367270315550716345614363474a797031794b436e4c5452";
export const symblAppSecret =
  "6c55645a5f394b594c394144692d6c436e557732516437615449455f6a3949744c686748764e594d6d71383178346d3036573374645f6f5969325068612d756e";
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
