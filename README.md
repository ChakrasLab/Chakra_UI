# InstiUI

InstiUI is organized as an npm workspace monorepo.

## Project Structure

```text
instiui/
├── apps/
│   └── docs/
│       └── src/
│           ├── app/
│           ├── components/
│           │   ├── documentation-layout/
│           │   ├── code-block/
│           │   ├── playground/
│           │   └── component-preview/
│           ├── content/
│           │   ├── docs/
│           │   ├── foundations/
│           │   │   ├── icons.mdx
│           │   │   ├── colors.mdx
│           │   │   ├── typography.mdx
│           │   │   └── design-tokens.mdx
│           │   └── components/
│           │       ├── button.mdx
│           │       ├── input.mdx
│           │       └── dialog.mdx
│           └── config/
│               └── navigation.ts
│
├── packages/
│   ├── icons/
│   │   └── src/
│   │       ├── icons/
│   │       │   ├── home.tsx
│   │       │   ├── search.tsx
│   │       │   ├── arrow-right.tsx
│   │       │   └── ...
│   │       ├── icon.tsx
│   │       ├── icon-registry.ts
│   │       └── index.ts
│   │
│   ├── react/
│   │   └── src/
│   │       ├── components/
│   │       │   ├── button/
│   │       │   ├── input/
│   │       │   ├── dialog/
│   │       │   └── ...
│   │       ├── hooks/
│   │       ├── utils/
│   │       └── index.ts
│   │
│   ├── tokens/
│   │   └── src/
│   │       ├── primitives.css
│   │       ├── semantic.css
│   │       ├── themes.css
│   │       └── index.css
│   │
│   └── registry/
│       ├── components/
│       └── registry.json
│
├── examples/
├── package.json
└── README.md
```

## Get started

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.
