async function applyUserTheme() {
  if (typeof monaco !== "undefined") {
    const ogSaveTheme = monaco.editor.setTheme;
    // hijack setTheme call from leetcode and apply custom theme
    monaco.editor.setTheme = () => {
      ogSaveTheme("hc-black");
      monaco.editor.setTheme = ogSaveTheme;
    };
  } else {
    setTimeout(applyUserTheme, 250);
  }
}

applyUserTheme();
