# Leetcode Custom Themes
## A Chrome extension for customizing the leetcode code editor

### Build extension

`npm run build`

### Load extension
1. Visit chrome://extensions
2. Turn on Developer mode
3. Click on Load Unpacked 
4. Select the folder named <b>extension</b> 
5. That's it, you can start using the extension 

### Tracking

* Basic functionality is done
* Most of the themes are taken from https://codemirror.net/theme/
* Yet to do:    
    * User can also set custom themes
    * What if user changes theme inside leetcode?
    * Upload to Chrome Web Store
* Have to check
    * Set the themes only once ('loading', 'complete')
    * Is service worker triggered in all pages?
* Done
    * Use npm to build the extension without utils and unnecessary files
    * Basic testing with Dark Reader chrome extension enabled, WORKS FINE
    * Support for playground 
    * What to show if the user opens extension in a non-leetcode page? - BASIC INSTRUCTION IS SHOWN
    * Current theme should be visible in the extension page - SHOWN ABOVE SELECT LIST
    * Is it affecting other areas - ONLY CHANGING IF PAGE IS PROBLEMS OR PLAYGROUND
    * Extension page, BASIC DONE
