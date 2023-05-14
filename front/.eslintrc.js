/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            allowExpressions: true,
          },
        ],
        "@typescript-eslint/array-type": [
          "error",
          {
            default: "generic",
            readonly: "generic",
          },
        ],
        "@typescript-eslint/no-unused-vars": "error",
      },
    },
  ],
};
