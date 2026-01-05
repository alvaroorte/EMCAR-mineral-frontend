const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
console.log(input);

const n = parseInt(input[0], 10);


if (n % 2 == 0 && n > 3) {
    console.log("YES");
} else {
    console.log("NO");
};
