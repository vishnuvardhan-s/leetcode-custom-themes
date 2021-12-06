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
chrome.runtime.sendMessage({ page: 'whatpage' }, (response) => {
    const currPage = response.currPage
    if (currPage === 'problems' || currPage === 'playground') {
        const className = currPage === 'problems' ? '.react-codemirror2' : '.ReactCodeMirror'
        waitForElm(className).then((element) => {
            const child = currPage === 'problems' ? element.children[0] : element.children[1]
            const array = [...child.classList]
            const theme = array.filter(classes => classes.startsWith("cm-s-"));
            // default theme is set to textmate
            chrome.storage.sync.get('codeTheme', function (response) {
                const codeTheme = response.codeTheme
                if (codeTheme === undefined) {
                    chrome.storage.sync.set({
                        'codeTheme': 'cm-s-textmate'
                    }, () => {
                        setCustomCSS(codeTheme)
                        child.classList.remove(theme[0])
                        child.classList.add(codeTheme)
                        // just in case if  the below classes are removed
                        if (child.classList.index('CodeMirror') == -1) {
                            child.classList.add('CodeMirror')
                        }
                        if (child.classList.index('CodeMirror-wrap') == -1) {
                            child.classList.add('CodeMirror-wrap')
                        }
                    })
                }
                else {
                    setCustomCSS(codeTheme)
                    child.classList.remove(theme[0])
                    child.classList.add(codeTheme)
                    // just in case if  the below classes are removed
                    if (child.classList.index('CodeMirror') === -1) {
                        child.classList.add('CodeMirror')
                    }
                    if (child.classList.index('CodeMirror-wrap') === -1) {
                        child.classList.add('CodeMirror-wrap')
                    }
                }
            });
        })
    }
    else {
        console.log("Extension is not supported in the current page")
    }
})
