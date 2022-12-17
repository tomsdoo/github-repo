const path = require("path");

module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts$": path.join(__dirname, "jest.babel.config.js")
  }
};
