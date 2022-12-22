importScripts("./styles.js");
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.startsWith("https://leetcode.com")) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["script.js"],
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.page === "whatpage") {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tabId]) => {
      const url = tabId.url;
      const parts = url.split("/");
      sendResponse({ currPage: parts[3] });
    });
    return true; // sendResponse after tab query
  }
  if (self.styles[request.theme] !== undefined) {
    sendResponse({ style: self.styles[request.theme] });
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tabId]) => {
    if (tabId.url.startsWith("https://leetcode.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId.id },
        files: ["script.js"],
      });
    }
  });
});
