function setCustomCSS(theme) {
  chrome.runtime.sendMessage({ theme: theme }, (response) => {
    const css = response.style;
    const head = document.head || document.getElementsByTagName("head")[0];
    const styleTag = document.createElement("style");
    head.appendChild(styleTag);
    styleTag.type = "text/css";
    styleTag.appendChild(document.createTextNode(css));
  });
}

function waitForElmXPath(xPath) {
  return new Promise((resolve) => {
    if (
      document.evaluate(
        xPath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue
    ) {
      return resolve(
        document.evaluate(
          xPath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue
      );
    }

    const observer = new MutationObserver((mutations) => {
      if (
        document.evaluate(
          xPath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue
      ) {
        resolve(
          document.evaluate(
            xPath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue
        );
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function waitForElmQuery(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function constructXPath() {
  const leetcodeThemes = [
    "textmate",
    "github",
    "xcode",
    "eclipse",
    "monokai",
    "blackboard",
    "solarized light",
    "solarized dark",
    "tomorrow night",
  ];
  let xPath = '//div[@class="ant-select-selection-selected-value" and (';
  for (let i = 0; i < leetcodeThemes.length - 1; i++) {
    xPath += `text()="${leetcodeThemes[i]}" or `;
  }
  xPath += `text()="${leetcodeThemes[leetcodeThemes.length - 1]}")]`;
  return xPath;
}

waitForElmXPath('//button[@icon="settings"]').then((element) => {
  element.addEventListener("click", () => {
    waitForElmQuery("[class^=setting-select-container]").then((_noneed) => {
      let xPath = constructXPath();
      waitForElmXPath(xPath).then((themeElement) => {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.type === "characterData") {
              // user has changed theme inside leetcode
              // respect user decision and make codeTheme to null
              chrome.storage.sync.set({ codeTheme: null });
            }
          });
        });
        var config = { characterData: true, subtree: true };
        observer.observe(themeElement, config);
      });
    });
  });
});

// if any error in extension, check here first
// this is the part where the code is dependent on leetcode page render
chrome.runtime.sendMessage({ page: "whatpage" }, (response) => {
  const currPage = response.currPage;
  const supportedPages = [
    "problems",
    "playground",
    "assessment",
    "contest",
    "explore",
  ];
  if (supportedPages.indexOf(currPage) > -1) {
    const className =
      currPage === "problems" || currPage === "assessment"
        ? ".react-codemirror2"
        : ".ReactCodeMirror";
    waitForElmQuery(className).then((element) => {
      const child =
        currPage === "problems" || currPage === "assessment"
          ? element.children[0]
          : element.children[1];
      const array = [...child.classList];
      const theme = array.filter((classes) => classes.startsWith("cm-s-"));
      // default theme is set to textmate
      chrome.storage.sync.get("codeTheme", function (response) {
        const codeTheme = response.codeTheme;
        // if codeTheme is undefined, probably the user has just installed the extension
        // or a theme is set from leetcode settings page
        if (codeTheme) {
          setCustomCSS(codeTheme);
          for (t of theme) {
            child.classList.remove(t);
          }
          child.classList.add(codeTheme);
          // just in case if  the below classes are removed
          const list = [...child.classList];
          if (list.indexOf("CodeMirror") === -1) {
            child.classList.add("CodeMirror");
          }
          if (list.indexOf("CodeMirror-wrap") === -1) {
            child.classList.add("CodeMirror-wrap");
          }
        }
      });
    });
  }
});
