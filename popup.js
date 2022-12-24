// too much dom manipulation :( ... sorry React
function format(codeTheme, isMonacoTheme) {
  if (codeTheme === null || codeTheme === undefined) {
    return "No";
  }
  if (isMonacoTheme) {
    const themeName = codeTheme.split("-").map((item) => item[0].toUpperCase() + item.slice(1));
    return themeName.join(" ");
  }
  const list = codeTheme.split("-").slice(2);
  const themeName = list.map((item) => item[0].toUpperCase() + item.slice(1));
  return themeName.join(" ");
}

function checkClassNames() {
  function doesExist(className) {
    return document.getElementsByClassName(className).length > 0;
  }
  if (doesExist("react-codemirror2") || doesExist("ReactCodeMirror")) {
    return "old";
  } else if (doesExist("monaco-editor")) {
    return "new";
  } else {
    return "unknown";
  }
}

function displayTheme(version) {
  const h4 = document.getElementById("selectedTheme");
  if (version === "old") {
    chrome.storage.sync.get("codeTheme", (response) => {
      h4.innerHTML = `${format(response.codeTheme)} theme is currently set!`;
    });
  } else if (version === "new") {
    chrome.storage.sync.get("codeThemeMonaco", (response) => {
      h4.innerHTML = `${format(response.codeThemeMonaco, true)} theme is currently set!`;
    });
  } else if (version === "unknown") {
    h4.innerHTML = "Leetcode not yet loaded. You can change theme once loaded!";
    h4.style.color = "red";
    h4.style.textAlign = "center";
    document.getElementById("select-for-code-mirror").style.display = "none";
    document.getElementById("select-for-monaco").style.display = "none";
  }
}

function displayPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: checkClassNames,
      },
      (res) => {
        const version = res[0].result;
        if (version === "new") {
          document.getElementById("select-for-code-mirror").style.display = "none";
          document.getElementById("select-for-monaco").style.display = "block";
        } else if (version === "old") {
          document.getElementById("select-for-monaco").style.display = "none";
          document.getElementById("select-for-code-mirror").style.display = "block";
        }
        displayTheme(version);
      }
    );
  });
}

document.getElementById("theme-monaco-specific").addEventListener("change", function () {
  const selectedTheme = document.getElementById("theme-monaco-specific").value;
  chrome.storage.sync.set({ codeThemeMonaco: selectedTheme }, () => {
    displayTheme("new");
  });
});

document.getElementById("theme").addEventListener("change", function () {
  const selectedTheme = document.getElementById("theme").value;
  chrome.storage.sync.set({ codeTheme: selectedTheme }, () => {
    displayTheme("old");
  });
});

function displayProperMessage() {
  const h4 = document.getElementById("selectedTheme");
  h4.innerHTML = "Please visit leetcode to change theme";
  const select = document.getElementById("theme");
  const arrow = document.getElementsByClassName("custom-arrow")[0];
  arrow.style.display = "none";
  select.remove();
}

function checkForWebPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tabId]) => {
    if (tabId.url.startsWith("https://leetcode.com")) {
      document.getElementById("select-for-code-mirror").style.display = "none";
      document.getElementById("select-for-monaco").style.display = "none";
      const h4 = document.getElementById("selectedTheme");
      h4.innerHTML = "Extension Loading...";
      displayPage();
    } else {
      displayProperMessage();
    }
  });
}

checkForWebPage();
