module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "amd": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
        "error", "always"
        ],
        "arrow-spacing": [
        "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "semi": [
            "error",
            "never"
        ]
        
    }
};