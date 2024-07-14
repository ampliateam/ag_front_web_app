import vue3Recommended from "eslint-plugin-vue/lib/configs/vue3-recommended.js";
import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import requireIndexExport from "./eslint-rules/require-index-export.js";
import noDirectFirebaseAuthImport from "./eslint-rules/no-direct-firebase-auth-import.js";

export default [
  {
    files: ["**/**/*.ts", "**/*.vue"],
    plugins: {
      vue: eslintPluginVue,
      "@typescript-eslint": tseslint,
      "custom-rules": {
        rules: {
          "require-index-export": requireIndexExport,
          "no-direct-firebase-auth-import": noDirectFirebaseAuthImport,
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      ...vue3Recommended.rules,
      ...tseslint.configs.recommended.rules,
      quotes: ['error', 'single'],
      '@typescript-eslint/quotes': ['error', 'single'],
      'vue/html-quotes': ['error', 'single'],
      "custom-rules/require-index-export": "error",
      "custom-rules/no-direct-firebase-auth-import": "error",
    },
  }
];