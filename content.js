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
      const theme = localStorage.getItem("LEETCODE_CUSTOM_THEME");
      window.postMessage(
        {
          type: "LEETCODE_CUSTOM_THEMES_REQUEST",
          theme: theme,
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

window.addEventListener("message", (event) => {
  if (event.data.type && event.data.theme && event.data.type === "APPLY_LEETCODE_CUSTOM_THEME") {
    window.postMessage({
      type: "LEETCODE_CUSTOM_THEMES_SWITCH_REQUEST",
      theme: event.data.theme,
    });
    window.addEventListener("message", (event) => {
      if (event.data.type && event.data.type === "LEETCODE_CUSTOM_THEMES_SWITCH_RESPONSE") {
        const theme = event.data.theme;
        const themeName = event.data.themeName;
        monaco.editor.defineTheme(themeName, theme);
        monaco.editor.setTheme(themeName);
      }
    });
  }
});
