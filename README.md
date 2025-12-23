# 🛒 Grocery List

A bilingual (Tamil/English) grocery list web app for Tamil households. Built with React, TypeScript, and Vite, featuring NFC tap-to-share for seamless list sharing between mobile devices.

## Features

- **Bilingual Support**: Switch between Tamil (default) and English
- **173 Grocery Items**: Organized across 10 categories (vegetables, fruits, pulses, grains, spices, dairy, oil, pooja items, household items)
- **NFC Tap-to-Share**: Share your grocery list between Android devices with a tap (Chrome on Android only)
- **Copy to Clipboard**: Export selected items as Markdown
- **LocalStorage Persistence**: Your selections are saved automatically
- **Mobile-First Design**: Built with Pico CSS for clean, responsive UI

## How to Use

1. **Select Items**: Check the items you need to buy
2. **Share via NFC** (Android only):
   - Person A: Select items → Tap "Share via Tap" → Hold phone ready
   - Person B: Tap "Receive via Tap" → Bring phones together
   - Lists are merged automatically
3. **Copy to Clipboard**: Click the copy button to export as Markdown
4. **Language Preference**: Saved automatically in your browser

## Tech Stack

- React 19.2.0
- TypeScript
- Vite 7.3.0
- Pico CSS 2.1.1
- Web NFC API (experimental)

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Builds to `docs/` folder for GitHub Pages deployment.

## NFC Support

NFC sharing requires:

- Chrome on Android
- HTTPS or localhost
- NFC enabled on both devices

The feature gracefully hides on unsupported browsers.

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
