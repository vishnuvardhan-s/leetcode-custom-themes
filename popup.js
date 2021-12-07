

function format(codeTheme) {
    if (codeTheme === undefined) {
        return "No"
    }
    const list = codeTheme.split('-').slice(2)
    const themeName = list.map((item) => item[0].toUpperCase() + item.slice(1))
    return themeName.join(' ')
}

function displayTheme() {
    chrome.storage.sync.get('codeTheme', (response) => {
        const h4 = document.getElementById("selectedTheme")
        h4.innerHTML = `${format(response.codeTheme)} theme is set!`
    })
}

document.getElementById("theme").addEventListener("change", function () {
    const selectedTheme = document.getElementById("theme").value
    chrome.storage.sync.set({ 'codeTheme': selectedTheme }, () => {
        console.log(`${selectedTheme} theme is set!`)
        displayTheme()
    })
})

function displayProperMessage() {
    const h4 = document.getElementById("selectedTheme")
    h4.innerHTML = 'Please visit leetcode to change theme'
    const select = document.getElementById("theme")
    select.remove()
}

function checkForWebPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tabId]) => {
        if (tabId.url.startsWith("https://leetcode.com")) {
            displayTheme()
        }
        else {
            displayProperMessage()
        }
    })
}

checkForWebPage()