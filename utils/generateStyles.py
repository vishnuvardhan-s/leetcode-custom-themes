import requests
from requests.api import get
# used hrefs.js to get this array[1:]
links = [
    "https://codemirror.net/theme/3024-day.css",
    "https://codemirror.net/theme/3024-night.css",
    "https://codemirror.net/theme/abbott.css",
    "https://codemirror.net/theme/abcdef.css",
    "https://codemirror.net/theme/ambiance-mobile.css",
    "https://codemirror.net/theme/ambiance.css",
    "https://codemirror.net/theme/ayu-dark.css",
    "https://codemirror.net/theme/ayu-mirage.css",
    "https://codemirror.net/theme/base16-dark.css",
    "https://codemirror.net/theme/base16-light.css",
    "https://codemirror.net/theme/bespin.css",
    "https://codemirror.net/theme/blackboard.css",
    "https://codemirror.net/theme/cobalt.css",
    "https://codemirror.net/theme/colorforth.css",
    "https://codemirror.net/theme/darcula.css",
    "https://codemirror.net/theme/dracula.css",
    "https://codemirror.net/theme/duotone-dark.css",
    "https://codemirror.net/theme/duotone-light.css",
    "https://codemirror.net/theme/eclipse.css",
    "https://codemirror.net/theme/elegant.css",
    "https://codemirror.net/theme/erlang-dark.css",
    "https://codemirror.net/theme/gruvbox-dark.css",
    "https://codemirror.net/theme/hopscotch.css",
    "https://codemirror.net/theme/icecoder.css",
    "https://codemirror.net/theme/idea.css",
    "https://codemirror.net/theme/isotope.css",
    "https://codemirror.net/theme/juejin.css",
    "https://codemirror.net/theme/lesser-dark.css",
    "https://codemirror.net/theme/liquibyte.css",
    "https://codemirror.net/theme/lucario.css",
    "https://codemirror.net/theme/material-darker.css",
    "https://codemirror.net/theme/material-ocean.css",
    "https://codemirror.net/theme/material-palenight.css",
    "https://codemirror.net/theme/material.css",
    "https://codemirror.net/theme/mbo.css",
    "https://codemirror.net/theme/mdn-like.css",
    "https://codemirror.net/theme/midnight.css",
    "https://codemirror.net/theme/monokai.css",
    "https://codemirror.net/theme/moxer.css",
    "https://codemirror.net/theme/neat.css",
    "https://codemirror.net/theme/neo.css",
    "https://codemirror.net/theme/night.css",
    "https://codemirror.net/theme/nord.css",
    "https://codemirror.net/theme/oceanic-next.css",
    "https://codemirror.net/theme/panda-syntax.css",
    "https://codemirror.net/theme/paraiso-dark.css",
    "https://codemirror.net/theme/paraiso-light.css",
    "https://codemirror.net/theme/pastel-on-dark.css",
    "https://codemirror.net/theme/railscasts.css",
    "https://codemirror.net/theme/rubyblue.css",
    "https://codemirror.net/theme/seti.css",
    "https://codemirror.net/theme/shadowfox.css",
    "https://codemirror.net/theme/solarized.css",
    "https://codemirror.net/theme/ssms.css",
    "https://codemirror.net/theme/the-matrix.css",
    "https://codemirror.net/theme/tomorrow-night-bright.css",
    "https://codemirror.net/theme/tomorrow-night-eighties.css",
    "https://codemirror.net/theme/ttcn.css",
    "https://codemirror.net/theme/twilight.css",
    "https://codemirror.net/theme/vibrant-ink.css",
    "https://codemirror.net/theme/xq-dark.css",
    "https://codemirror.net/theme/xq-light.css",
    "https://codemirror.net/theme/yeti.css",
    "https://codemirror.net/theme/yonce.css",
    "https://codemirror.net/theme/zenburn.css"
]


def getStyleName(link):
    stylename = link.split('/')[-1].split('.')[0]
    stylename = stylename.replace('-', '_')
    if stylename[0].isnumeric():
        stylename = '_'+stylename
    return stylename


def generateStyles():
    f = open('../worker/styles.js', 'a')
    for link in links:
        print('Requesting ', link)
        stylename = getStyleName(link)
        res = requests.get(link)
        s = 'var '+stylename+' = '+'`'+res.text+'`'
        f.write(s+'\n')
    f.close()


def generateJSON():
    f = open('../worker/styles.js', 'a')
    s = 'var styles = {'
    for link in links:
        key = 'cm-s-' + link.split('/')[-1].split('.')[0]
        value = getStyleName(link)
        s += '"'+key+'": '+value+','+'\n'
    s += '}'
    f.write(s)
    f.close()


# to clean out the file
print('Cleaning styles.js')
t = open('../worker/styles.js', 'w')

generateStyles()
generateJSON()
