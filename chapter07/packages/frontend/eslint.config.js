// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import jest from "eslint-plugin-jest";

export default [
  js.configs.recommended,

  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest, // ← 文字列ではなくオブジェクト
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];
