# Chakra Icons

Shared, monochrome SVG icons for the Chakra UI workspace. All icons inherit `currentColor` and use the same 24 × 24 viewBox, 2-unit rounded stroke, accessible defaults, and `size` prop.

## Package status

This package is prepared for public npm publishing but has not been released yet. After release, install it with `npm i @chakra/icons`.

## Use an icon

```tsx
import { SearchIcon } from "@chakra/icons";

function SearchButton() {
  return (
    <button type="button" aria-label="Search">
      <SearchIcon size={20} aria-hidden="true" />
    </button>
  );
}
```

Decorative icons are hidden from assistive technology by default. Pass `title` when an icon is informative on its own:

```tsx
<InfoIcon title="More information" size={20} />
```

## Categories

- `core/` — common interface, concept, and utility symbols.
- `navigation/` — movement, disclosure, and menu symbols.
- `forms/` — form and control symbols.
- `feedback/` — status and feedback symbols.

Every public icon is explicitly exported from `src/index.ts`. The documentation catalog imports those same components and includes names, descriptions, and search keywords for discovery.

Institutional motifs are added only when a real component or content pattern needs them. They remain separate from ordinary interface icons.
