module.exports = {
  "globals": {
    "window": true
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "react/destructuring-assignment": [false, "always", { "ignoreClassFields": true }]
  }
};
