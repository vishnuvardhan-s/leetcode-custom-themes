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
)

chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("changes")
    chrome.tabs.query({ active: true, currentWindow: true }, ([tabId]) => {
        console.log(tabId)
        if (tabId.url.startsWith("https://leetcode.com")) {
            chrome.scripting.executeScript({
                target: { tabId: tabId.id },
                files: ['script.js']
            }, () => {
                console.log("Script callback")
            })
        }
    })
})