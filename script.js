function setCustomCSS(theme) {
    chrome.runtime.sendMessage({ theme: theme }, (response) => {
        const css = response.style
        const head = document.head || document.getElementsByTagName('head')[0]
        const styleTag = document.createElement('style');
        head.appendChild(styleTag);
        styleTag.type = 'text/css';
        styleTag.appendChild(document.createTextNode(css));
        console.log("Custom theme set!")
    })
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('.react-codemirror2').then((element) => {
    const child = element.firstChild
    const theme = child.classList[1]
    setCustomCSS("cm-s-elegant")
    child.classList.remove(theme)
    child.classList.add("cm-s-elegant")
})