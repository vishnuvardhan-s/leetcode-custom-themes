function setCustomCSS(theme) {
    chrome.runtime.sendMessage({ theme: theme }, (response) => {
        const css = response.style
        const head = document.head || document.getElementsByTagName('head')[0]
        const styleTag = document.createElement('style');
        head.appendChild(styleTag);
        styleTag.type = 'text/css';
        styleTag.appendChild(document.createTextNode(css));
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

// if any error in extension, check here first
// this is the part where the code is dependent on leetcode page render
waitForElm('.react-codemirror2').then((element) => {
    const child = element.firstChild
    const theme = child.classList[1]
    // default theme is set to textmate
    chrome.storage.sync.get('codeTheme', function (response) {
        const codeTheme = response.codeTheme
        if (codeTheme === undefined) {
            chrome.storage.sync.set({
                'codeTheme': 'cm-s-textmate'
            }, () => {
                setCustomCSS(codeTheme)
                child.classList.remove(theme)
                child.classList.add(codeTheme)
            })
        }
        else {
            setCustomCSS(codeTheme)
            child.classList.remove(theme)
            child.classList.add(codeTheme)
        }
    });
})