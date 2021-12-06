document.getElementById("theme").addEventListener("change", function () {
    const selectedTheme = document.getElementById("theme").value;
    chrome.storage.sync.set({ 'codeTheme': selectedTheme }, () => {
        console.log(`${selectedTheme} theme is set!`)
    })
});