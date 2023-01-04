import { Content } from "./lists/blackList/oisd_dbl_basic.json";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { cancel: true };
  },
  { urls: Content },
  ["blocking"]
);
