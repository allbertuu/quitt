// https://docs.expo.dev/guides/using-eslint/
// @ts-check

import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import expoConfig from "eslint-config-expo/flat.js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  ...pluginQuery.configs["flat/recommended"],
]);

