async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

window.addEventListener("message", async (event) => {
  if (event.data.type && event.data.theme && event.data.type === "LEETCODE_CUSTOM_THEMES_REQUEST") {
    const themeURL = chrome.runtime.getURL(`/themes/${event.data.theme}.json`);
    const theme = await getData(themeURL);
    const themeListURL = chrome.runtime.getURL("themes/themelist.json");
    const themeList = await getData(themeListURL);
    const themeName = themeList[event.data.theme];
    window.postMessage({
      type: "LEETCODE_CUSTOM_THEMES_RESPONSE",
      theme: theme,
      themeName: themeName,
    });
  }

  if (event.data.type && event.data.theme && event.data.type === "LEETCODE_CUSTOM_THEMES_SWITCH_REQUEST") {
    const themeURL = chrome.runtime.getURL(`/themes/${event.data.theme}.json`);
    const theme = await getData(themeURL);
    const themeListURL = chrome.runtime.getURL("themes/themelist.json");
    const themeList = await getData(themeListURL);
    const themeName = themeList[event.data.theme];
    window.postMessage({
      type: "LEETCODE_CUSTOM_THEMES_SWITCH_RESPONSE",
      theme: theme,
      themeName: themeName,
    });
  }
});
