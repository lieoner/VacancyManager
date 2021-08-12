let str = process.argv[2] ?? '';

var hash = 0,
    i,
    chr;
if (str.length === 0) console.log(hash);
for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
}
console.log(hash);
