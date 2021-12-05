importScripts('./styles.js')
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.startsWith("https://leetcode.com")) {
        chrome.scripting.executeScript({
            target: { tabId },
            files: ['script.js']
        }, () => {
            console.log("Script callback")
        })
    }
})

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (self.styles[request.theme] !== undefined) {
            sendResponse({ style: self.styles[request.theme] })
        }
    }
);