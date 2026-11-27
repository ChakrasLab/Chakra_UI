# @chakra/tokens

CSS custom properties for the shared primitive palette, semantic roles, and light and dark themes.

This package is prepared for npm publishing but has not been released yet. After release, install it with:

```sh
npm install @chakra/tokens
```

Import the token stylesheet once in your application's entry point:

```css
@import "@chakra/tokens/index.css";
```

Override semantic variables after the import to customize the theme. Prefer semantic roles such as `--chakra-color-brand` and `--chakra-color-surface-canvas` over primitive palette values in component styles.
