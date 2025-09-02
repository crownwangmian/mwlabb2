module.exports = {
  env: { browser: true, es2022: true, node: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  rules: {
    "react/prop-types": "off" // 我们用 TS，不需要 prop-types
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // 你想对 TS 文件额外放宽/收紧的规则可写在这里
      }
    }
  ]
}
