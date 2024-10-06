import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

const config = {
  env: {
    browser: true,   // Enable browser globals
    es2021: true,    // Enable ES2021 features
    node: true,      // Enable Node.js globals
  },
  parserOptions: {
    ecmaVersion: 12, // Use ES2021 syntax
    sourceType: 'module', // Allow using import/export statements
  },
  extends: [
    'eslint:recommended', // Use the recommended ESLint rules
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended, // Use recommended React rules
  ],
  plugins: [
    'react',            // Enable React plugin
  ],
  rules: {
    'no-console': 'warn', // Warn for console logs
    // Add any other custom rules here...
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the version of React
    },
  },
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      languageOptions: {
        globals: {
          ...globals.browser, // Define globals for browser
          process: true,       // Add process as a global variable
        },
      },
    },
    {
      files: ['**/*.test.js', '**/*.test.jsx'], // Specify files for test configurations
      env: {
        jest: true, // Enable Jest globals for testing files
      },
    },
  ],
};

export default config;
