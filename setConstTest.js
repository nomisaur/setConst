const setConst = require("./setConst")(__dirname, __filename);
return;

const i = 0;
while (i < 3) {
  setConst(i, i + 1);
}
console.log(i);
