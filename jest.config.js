module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>"],
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.(ts|js)x?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
};
