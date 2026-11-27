# @hobiui/tokens

CSS custom properties for Hobi UI's primitive palette, semantic roles, spacing, typography, and light and dark themes.

## Install

```sh
npm install @hobiui/tokens
```

## Load the styles

Import the stylesheet once from your app entry point. This works with Vite and other bundlers that process CSS imports:

```tsx
import "@hobiui/tokens/index.css";
```

You can also import it from a CSS file:

```css
@import "@hobiui/tokens/index.css";
```

## Customize the theme

Override semantic variables after the package stylesheet. Prefer semantic roles over primitive palette values in your app styles:

```css
:root {
  --hobiui-color-brand: #3157c8;
  --hobiui-color-surface-canvas: #fff;
}
```

The package follows the user's color-scheme preference by default. Set `data-theme="light"` or `data-theme="dark"` on the root element or a subtree to choose a theme explicitly.

The package also exports `primitives.css`, `semantic.css`, and `themes.css` for apps that need to compose the layers themselves.

## Links

- [Design token documentation](https://ui.hobiqora.in)
- [Source and issue tracker](https://github.com/HobiqoraLabs/hobiui)
- [License](./LICENSE)
