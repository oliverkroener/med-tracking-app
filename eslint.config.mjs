import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts"],
    // Treat all .ts files as "typescript"
    languageOptions: {
      parser: "@typescript-eslint/parser",
    },
    rules: {
      // Add your custom TypeScript rules here
      "no-undef": "off",
      // Example: "@typescript-eslint/some-rule": "error"
    },
    // If you have a custom formatter, specify it here
    // formatter: "your-typescript-formatter", // Uncomment and replace if needed
  },
];

export default eslintConfig;
