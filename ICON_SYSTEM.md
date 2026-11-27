# InstiUI Icon System — Agent Guidelines

> **Purpose:** Keep every icon in InstiUI visually consistent, accessible, theme-aware, and maintainable.
>
> **Product context:** InstiUI is an India-first institutional React design system for government, public-service, corporate, and enterprise interfaces. Its visual language is minimal and editorial: navy linework, restrained saffron/green accents, generous whitespace, and occasional dither/pixel details.

## 1. Non-negotiable principles

1. **One shared icon source.** All reusable icons live in `packages/icons`. The docs app consumes that package; do not create a second icon library inside `apps/docs`.
2. **Consistency before decoration.** Icons must look like members of one family at the same size. Do not add Indian motifs, tricolour accents, shadows, or textures to ordinary icons just for decoration.
3. **Recognizable at a glance.** Prefer a familiar, simple silhouette over a clever but unclear metaphor.
4. **Navy first.** Use the current semantic icon color by default. Saffron and green are accents, not mandatory colors for every icon.
5. **Accessible by default.** Decorative icons must not create noisy screen-reader output; meaningful icons need an accessible name or visible text.
6. **Theme-aware.** Icons should work in light and dark themes without hard-coded colors that become invisible or clash.
7. **Respectful Indian identity.** Indian cultural and architectural motifs must be simplified respectfully and remain recognizable. Do not create unofficial government seals, copy protected official insignia, or imply government endorsement.

## 2. Icon categories

### A. Core UI
Examples: `search`, `plus`, `edit`, `trash`, `download`, `upload`, `bell`, `settings`, `copy`, `external-link`.

### B. Navigation
Examples: `home`, `menu`, `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`, `arrow-left`, `arrow-right`, `grid`.

### C. Forms and actions
Examples: `calendar`, `user`, `mail`, `lock`, `eye`, `eye-off`, `check`, `close`, `filter`, `sort`.

### D. Status and feedback
Examples: `success`, `warning`, `error`, `info`, `star`, `heart`, `refresh`, `loading`.

Use semantic feedback colors only when the icon communicates that state. Do not use red, green, or orange as arbitrary decoration.

### E. Indian and institutional
Examples: `ashoka-chakra`, `lotus`, `india-gate`, `rashtrapati-bhavan`, `institution`, `citizen-services`, `agriculture`, `tourism`.

Keep this category intentional and smaller than the core UI set. Add a motif only when it serves a clear product or content purpose.

## 3. Geometry and drawing rules

- Default canvas: **24 × 24 units**, with `viewBox="0 0 24 24"`.
- Keep a consistent optical footprint. Most shapes should sit within a roughly 20 × 20 unit area, leaving enough breathing room; adjust per icon when the shape requires it.
- Default outline stroke: **1.8–2 units**. Pick the exact library standard once and apply it consistently.
- Use rounded caps and joins for the default friendly institutional style, unless a specific geometric motif requires otherwise.
- Align strokes to avoid blur at common rendered sizes. Check the icon at 16, 20, 24, and 32 CSS pixels.
- Avoid unnecessary tiny details, overlapping strokes, inconsistent corner radii, and different visual weights between icons.
- Prefer simple SVG paths and shapes. Avoid embedding raster images in icon components.
- Avoid emoji as production icons.
- Do not add filters, drop shadows, gradients, or animation to individual icons by default.
- If a motif requires extra detail (for example, the spokes of an Ashoka Chakra), simplify it enough to remain legible at its intended minimum size. Do not force complex illustrations into a 16 px control.

## 4. Color policy

Use semantic tokens rather than raw hex values in component code.

Suggested semantic roles (map these to the repository's canonical token names):
- `icon.default`: primary navy/text color.
- `icon.muted`: secondary or subdued icon color.
- `icon.interactive`: interactive link/control color.
- `icon.onSolid`: icon color on a solid button or colored surface.
- `status.success`, `status.warning`, `status.error`, `status.info`: semantic feedback colors.
- `brand.saffron` and `brand.green`: restrained brand accents.

Rules:
- Standard icons should normally use `currentColor` so their color follows the surrounding text/control.
- Do not hard-code navy, saffron, or green inside a generic icon SVG.
- For multicolor Indian/institutional illustrations, use explicit theme-aware CSS variables or component props, with a monochrome fallback.
- Do not assume white on saffron or white on green meets contrast requirements. Validate each actual foreground/background pair.
- In dark mode, use semantic theme mappings; do not blindly invert the icon or reuse a color that loses contrast.
- Dither/pixel patterns are optional decorative assets, not part of every icon. Keep them subtle and away from control hit areas.

## 5. Outline and filled variants

- `outline` is the default for most interface icons.
- `filled` is reserved for selected/active states or icons whose silhouette is clearer when filled.
- Do not invent a filled version just to make the library appear complete.
- If both variants exist, they must share the same name and communicate the same concept.
- Use one variant consistently within a control group or navigation level.
- Do not mix unrelated icon styles (for example, thin outline icons beside thick duotone icons) in the same interface.

## 6. React + TypeScript API

Use a consistent public API for all icons. A recommended shape is:

```tsx
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}

export function SearchIcon({
  size = 24,
  title,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={className}
      {...props}
    >
      {/* SVG paths */}
    </svg>
  );
}
```

This is a pattern, not a mandate to duplicate the same boilerplate manually. Shared utilities may be used if they do not add unnecessary runtime weight.

API rules:
- Export named React components with predictable names, such as `SearchIcon` and `AshokaChakraIcon`.
- Use `size` consistently; default to `24`.
- Support normal SVG props such as `className`, `style`, and `aria-*`.
- Use `currentColor` for monochrome icons.
- Do not add per-icon props that are not meaningfully needed.
- Avoid making every icon animated. Animation belongs to the consuming component unless the icon itself has a clear stateful purpose.
- Keep the public API tree-shakeable; importing one icon should not require the entire icon catalogue at runtime.

## 7. Accessibility

- If an icon is next to visible text that already names the action, treat the icon as decorative: `aria-hidden="true"`.
- If an icon is the only content in a button or link, the **button/link** must have an accessible name, for example `aria-label="Search documentation"`. Do not rely on an unlabeled SVG alone.
- For a standalone informative icon, provide an accessible name through a documented title/label approach.
- Never communicate status by color alone; pair the icon with text or another clear indicator.
- Keep keyboard focus indicators on the interactive control, not on a decorative SVG.
- Test icons against light and dark backgrounds and at browser zoom levels.
- Respect reduced-motion preferences if a loading or state icon is animated.

## 8. Package structure

Keep all source icons in one shared package. Adapt names to the repository's established conventions, but preserve this separation:

```text
instiui/
├── apps/
│   └── docs/
│       └── src/
│           └── ...                  # Documentation UI consumes shared icons
└── packages/
    └── icons/
        ├── src/
        │   ├── core/
        │   ├── navigation/
        │   ├── forms/
        │   ├── feedback/
        │   ├── institutional/
        │   ├── types.ts
        │   └── index.ts
        ├── package.json
        └── README.md
```

- Do not create `apps/docs/src/icons` as a duplicate source library.
- The docs app may contain icon previews, category metadata, search/filter UI, and examples—but imports icon components from `@chakra/icons`.
- Keep `packages/react` free to consume the same icon package for component defaults where appropriate.
- Keep the registry in `packages/registry` responsible for registry-ready component/source entries, not as a second canonical icon implementation.
- Use explicit named exports from `src/index.ts`. Add category entry points only if they improve the public API and remain tree-shakeable.

## 9. Naming and files

- Use kebab-case for source filenames: `search.tsx`, `ashoka-chakra.tsx`, `india-gate.tsx`.
- Use PascalCase for React component names: `SearchIcon`, `AshokaChakraIcon`, `IndiaGateIcon`.
- Keep names concrete, searchable, and consistent. Prefer `chevron-right` over ambiguous names such as `next`.
- Avoid multiple names for the same icon unless a documented alias is needed for compatibility.
- Document any alias rather than silently duplicating the SVG source.
- Each icon should have a short description, category, and keywords in the icon catalogue/docs metadata.

## 10. Adding or changing an icon

Before adding a new icon:
1. Search the existing catalogue for the same concept and likely synonyms.
2. Confirm the icon is needed by a real component, documented pattern, or supported user workflow.
3. Choose a clear name and category.
4. Draw it on the standard grid using the established stroke and optical-weight rules.
5. Use semantic color/currentColor unless it is an approved multicolor institutional motif.
6. Export it from the shared package barrel.
7. Add it to the docs catalogue with a description and search keywords.
8. Include a usage example if the icon has a non-obvious meaning or API.
9. Check it at 16, 20, 24, and 32 px, plus light and dark themes.
10. Run type checks, lint, tests, and the package build.

When changing an existing icon, preserve its name and meaning unless a deliberate breaking change is approved. Check all consumers for visual regressions.

## 11. Usage examples

Decorative icon beside visible text:

```tsx
import { SearchIcon } from "@chakra/icons";

<button type="button">
  <SearchIcon size={18} aria-hidden="true" />
  Search
</button>
```

Icon-only control:

```tsx
import { SearchIcon } from "@chakra/icons";

<button type="button" aria-label="Search documentation">
  <SearchIcon size={20} aria-hidden="true" />
</button>
```

Institutional motif (illustrates the API for a future, approved icon; it is not part of the current package exports):

```tsx
import { AshokaChakraIcon } from "@chakra/icons";

<AshokaChakraIcon
  size={24}
  aria-hidden="true"
  style={{ color: "var(--chakra-color-text-primary)" }}
/>
```

Use the actual token utility/API available in the repository; do not introduce a new styling convention solely for this example.

## 12. Do not do these things

- Do not add a second icon source folder in the docs app.
- Do not mix icon libraries or stroke weights in the same UI without a documented reason.
- Do not hard-code brand colors into generic SVG paths.
- Do not apply saffron, green, pixelation, or Indian motifs to every standard icon.
- Do not use emoji or tiny ASCII art as substitutes for production UI icons.
- Do not use complex architectural illustrations as 16 px action icons.
- Do not use unofficial seals or imply endorsement by an Indian government body.
- Do not remove accessible names from icon-only controls.
- Do not export icons through a barrel that prevents tree-shaking.
- Do not add an icon without checking whether an equivalent already exists.

## 13. Pull request checklist

Before considering icon work complete, verify:

- [ ] The icon belongs in the shared `packages/icons` package.
- [ ] Its name, category, grid, stroke, and optical weight match the system.
- [ ] It uses `currentColor` or approved semantic/theme tokens.
- [ ] Light and dark themes both have adequate contrast.
- [ ] Decorative and informative accessibility behavior is correct.
- [ ] The icon is legible at its supported sizes.
- [ ] The icon is exported and discoverable in the docs catalogue.
- [ ] No duplicate implementation was added elsewhere.
- [ ] Type checks, lint, tests, and build pass.
- [ ] Indian motifs are respectful, recognizable, and not presented as official insignia.

---

**Agent instruction:** When implementing or reviewing icons, follow this file as the source of truth. If the repository already has a more specific, approved token name or API convention, reuse it consistently and update this guide deliberately rather than introducing a competing convention.
