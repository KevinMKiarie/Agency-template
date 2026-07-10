import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // Catch unused variables — prevents dead code creeping in
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // No implicit any — everything must be typed
      "@typescript-eslint/no-explicit-any": "error",
      // Enforce consistent imports
      "import/no-duplicates": "error",
      // Prevent console.log left in production code
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
])

export default eslintConfig
