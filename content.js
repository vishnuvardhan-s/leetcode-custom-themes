async function applyUserTheme() {
  if (typeof monaco !== "undefined") {
    const ogSaveTheme = monaco.editor.setTheme;
    // hijack setTheme call from leetcode and apply custom theme
    monaco.editor.setTheme = async () => {
      window.postMessage(
        { type: "LEETCODE_CUSTOM_THEMES_REQUEST", theme: "Github Dark" },
        "*"
      );
      window.addEventListener("message", (event) => {
        if (
          event.data.type &&
          event.data.type === "LEETCODE_CUSTOM_THEMES_RESPONSE"
        ) {
          const theme = event.data.theme;
          monaco.editor.defineTheme("github-dark", theme);
          ogSaveTheme("github-dark");
          monaco.editor.setTheme = ogSaveTheme;
        }
      });
    };
  } else {
    setTimeout(applyUserTheme, 250);
  }
}

applyUserTheme();
