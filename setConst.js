const compile = (inputCode) =>
  inputCode
    .filter((line) => line.includes("setConst("))
    .map((line) => {
      const [variable, ...vals] = line
        .trim()
        .split("setConst(")[1]
        .split(")")[0]
        .split(",");
      return [variable, vals.join("").trim()];
    })
    .reduce(
      (code, [variable, value]) =>
        code.map((line) => {
          if (line.includes(`const ${variable} = `)) {
            return line.replace("const", "let");
          } else if (line.includes(`${variable} = `)) {
            return `throw(TypeError("Assignment to constant variable."));`;
          }
          if (line.includes("setConst(")) {
            return `${variable} = ${value}`;
          }
          return line;
        }),
      inputCode
    )
    .splice(2);

module.exports = (dirname, filename) =>
  eval(
    compile(
      require("fs")
        .readFileSync(require("path").resolve(dirname, filename), "UTF-8")
        .split("\n")
    ).join("\n")
  );
