function applyUserTheme() {
  if (typeof monaco !== "undefined") {
    const ogSaveTheme = monaco.editor.setTheme;

    function setCustomTheme(event) {
      if (event.data.type && event.data.type === "LEETCODE_CUSTOM_THEMES_RESPONSE") {
        const theme = event.data.theme;
        const themeName = event.data.themeName;
        monaco.editor.defineTheme(themeName, theme);
        ogSaveTheme(themeName);
        monaco.editor.setTheme = ogSaveTheme;
      }
    }

    // hijack setTheme call from leetcode and apply custom theme
    monaco.editor.setTheme = () => {
      window.postMessage(
        {
          type: "LEETCODE_CUSTOM_THEMES_REQUEST",
          theme: "GitHub Dark",
        },
        "*"
      );
      window.addEventListener("message", setCustomTheme);
    };
  } else {
    setTimeout(applyUserTheme, 250);
  }
}

window.addEventListener("load", () => {
  applyUserTheme();
});
