# Leetcode Custom Themes

## A Chrome extension for customizing the leetcode code editor

With this extension, you may personalize the Leetcode Code Editor with a number of different themes.

<hr>

### Available in Chrome Web Store

https://chrome.google.com/webstore/detail/leetcode-custom-themes/nkbhfhhjppjiflcboogbiahjlknaehhl/

<hr>

Demo: https://youtu.be/XJA-xmDRIwk

<hr>

Quick look

![image](https://user-images.githubusercontent.com/45058522/189153960-6f3e1723-b4e0-4638-8aea-647071d75136.png)

<br>

![image](https://user-images.githubusercontent.com/45058522/189154032-1a9569cb-563b-44a9-a928-76c626f67fed.png)

<hr>

## Contribution

### Old Leetcode UI

Old Leetcode UI uses `codemirror` based themes. If you are still using the old version and need a new theme, you can add it by following [this](https://github.com/vishnuvardhan-s/leetcode-custom-themes/pull/2) PR and create a pull request

<hr>

### New Leetcode UI

New Leetcode UI uses `monaco` based themes. For this,

1. New themes can be added by creating a theme file (`json`) inside `themes/` folder.
2. Update `themelist.json` in `themes/` folder.
3. Update `select` dropdown in `popup.html`
