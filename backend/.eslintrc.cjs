module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    'extends': 'eslint:recommended',
    'rules': {
        'semi': ['error', 'always'],
        'eqeqeq': ['error', 'always'],
        'no-var': ['error'],
        'no-cond-assign': ['error']
    }
};
