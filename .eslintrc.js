// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  "globals": {
    "pca": true,        // Canada Post Address Complete
    "addressComplete": true,
    "dataLayer": true,  // Google Tag Manager
    "Snap": true,       // Snap SVG
  },
  extends: "standard",
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "indent": ["error", 2, { "SwitchCase": 2 }],
    "semi": ["error", "always"],
  }
}
