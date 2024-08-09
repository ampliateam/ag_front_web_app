import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import vueEslintParser from "vue-eslint-parser";
import tsParse from "@typescript-eslint/parser"
import requireIndexExport from "./eslint-rules/require-index-export.js";
import noDomainImport from "./eslint-rules/no-domain-import.js";
import vue3StronglyRecommended from "eslint-plugin-vue/lib/configs/vue3-strongly-recommended.js";

export default [
  {
    files: ["**/**/*.ts", "**/*.vue"],
    plugins: {
      vue: eslintPluginVue,
      "@typescript-eslint": tseslint,
      "custom-rules": {
        rules: {
          "require-index-export": requireIndexExport,
          "no-domain-import": noDomainImport,
        },
      },
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsParse,
      },
    },
    rules: {
      ...vue3StronglyRecommended.rules,
      ...tseslint.configs.recommended.rules,
      quotes: ['error', 'single'],
      '@typescript-eslint/quotes': ['error', 'single'],
      'vue/html-quotes': ['error', 'double'],
      "custom-rules/require-index-export": "error",
      "custom-rules/no-domain-import": "error",
      'jsx-a11y/no-redundant-roles': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
];