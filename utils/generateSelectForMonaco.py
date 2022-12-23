import os
import json
path = os.path.join(os.path.dirname(__file__), '../',
                    'themes', 'themelist.json')

themes = json.load(open(path))

html = ''
for theme in themes:
    html += '<option value="' + \
        themes[theme]+'">'+theme+"</option>\n"
print(html)
