module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    ".eslintrc.js"
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  files: ['**/*.ts','**/*.js'],
  rules: {
    "no-trailing-spaces": ['error', 'never'],
    "padded-blocks": ["error", "never"],
    "quotes": ["error", "single"],
    'object-curly-spacing': ['error', 'always'],
    "import/no-unresolved": 0,
    "indent": ["error", 4],
  },
};
