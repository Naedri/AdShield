// import { Content } from "./lists/blackList/oisd_dbl_basic.json";

let countBlockedUrls = 0;
let blockerActive = true;

const triggerBlocking = function () {
  fetch("https://dbl.oisd.nl/basic/")
    .then((response) => response.text())
    .then((response) => {
      try {
        /**
         * Cleaning
         */
        //response = response.replace(/^.*#.*$/gm, "").trim();
        response = response
          .split("\n")
          .filter(function (line) {
            return !line.startsWith("#");
          })
          .join("\n");
        if (response.startsWith("\n")) {
          response = response.slice(1);
        }
        if (response.endsWith("\n")) {
          response = response.slice(0, -1);
        }

        response = response.split("\n").join('","');
        response = `["${response}"]`;

        /**
         * Parsing to regex
         */
        blackList = JSON.parse(response);
        console.log("Number of urls to block : ", blackList.length);
        blackList = blackList.map((element) => `*://${element}/*`);

        return blackList;
      } catch (error) {
        console.error("Error happened here!");
        console.error(error);
      }
    })
    .then((blackList) => {
      chrome.webRequest.onBeforeRequest.addListener(
        requestListener,
        { urls: blackList },
        ["blocking"]
      );
    });
};

const requestListener = function (details) {
  ++countBlockedUrls;
  chrome.browserAction.setBadgeText({ text: countBlockedUrls.toString() });
  // console.log("Total URL blocked : ", JSON.stringify(countBlockedUrls));
  console.log("URL blocked : ", JSON.stringify(details.url));
  return { cancel: true };
};

triggerBlocking();
