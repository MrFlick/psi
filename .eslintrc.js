module.exports = {
    "env": {"node": true, "es6": true},
    "rules": {
      "no-console": 0,
      "object-curly-newline": ["error", { minProperties: 6, multiline: true, consistent: true }]
     },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb"
    ],
    "parser": "babel-eslint"
  };