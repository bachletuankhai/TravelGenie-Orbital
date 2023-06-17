module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-hooks',
  ],
  'rules': {
    'no-unused-vars': 'warn',
    'quotes': 'off',
    'require-jsdoc': 'off',
    'camelcase': ['off',
      { 'ignoreDestructuring': true, 'ignoreImports': true }],
    'linebreak-style': 'off',
    'object-curly-spacing': ['warn', 'always', { 'objectsInObjects': false }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
