# @hobiui/icons

Tree-shakeable SVG icons for React. Icons inherit `currentColor`, use a 24 × 24 viewBox, and expose accessible defaults and a `size` prop.

## Install

```sh
npm install @hobiui/icons
```

React 18 and 19 are supported as peer dependencies.

## Use an icon

```tsx
import { SearchIcon } from "@hobiui/icons";

export function SearchButton() {
  return (
    <button type="button" aria-label="Search">
      <SearchIcon size={20} aria-hidden="true" />
    </button>
  );
}
```

Decorative icons are hidden from assistive technology by default. Import the icon and pass a title when it conveys information on its own:

```tsx
import { InfoIcon } from "@hobiui/icons";

export function MoreInfo() {
  return <InfoIcon title="More information" size={20} />;
}
```

All public icons and the `IconProps` type are exported from the package root. TypeScript declarations are included; TypeScript applications should have `@types/react` installed.

## Links

- [Documentation and icon catalog](https://ui.hobiqora.in)
- [Source and issue tracker](https://github.com/HobiqoraLabs/hobiui)
- [License](./LICENSE)
