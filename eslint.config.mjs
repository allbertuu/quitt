// https://docs.expo.dev/guides/using-eslint/
import pluginQuery from "@tanstack/eslint-plugin-query";
import expoConfig from "eslint-config-expo/flat.js";
import { defineConfig } from "eslint/config";
import { configs as _configs } from "typescript-eslint";

export default defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  ...pluginQuery.configs["flat/recommended"],
  ..._configs.recommended,
]);

