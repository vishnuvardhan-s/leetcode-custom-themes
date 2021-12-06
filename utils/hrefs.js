// used to get all the links of a website as an array of strings
// paste this inside console of the website
// https://codemirror.net/theme/
var arr = [], l = document.links;
for (var i = 0; i < l.length; i++) {
    arr.push(l[i].href);
}