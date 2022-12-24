function injectScript(filePath, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", filePath);
  node.appendChild(script);
}
injectScript(chrome.runtime.getURL("content.js"), "body");
