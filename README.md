# Hobi UI

Hobi UI is an npm workspace monorepo. Reusable design-system code lives in `packages/`; the docs site consumes those packages and owns documentation-specific layout and content.

## Workspace boundaries

```text
apps/docs/       Documentation site, navigation, examples, and site shell
packages/tokens  Primitive values, semantic tokens, and theme CSS
packages/icons  Shared React SVG icons
packages/react  Reusable React components
packages/registry Registry metadata for copy-and-paste distribution
examples/       Consumer examples
```

`packages/react` is the source of truth for reusable components. `packages/registry` is only a distribution format; registry entries should point to real, maintained files and must not become a second implementation of a component.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## CI and deployment

- GitHub Actions builds the workspace packages and documentation site for pull requests and pushes to `main`.
- Vercel hosts and deploys the documentation site. Keep the Vercel project connected to this repository and use `main` as its production branch; Vercel can create preview deployments for pull requests.
- Dependabot checks npm workspace dependencies and GitHub Actions weekly.

## Published packages

The public packages are published independently under `@hobiui`:

- [`@hobiui/react`](https://www.npmjs.com/package/@hobiui/react) — React components; install `@hobiui/tokens` as well and load both stylesheets.
- [`@hobiui/icons`](https://www.npmjs.com/package/@hobiui/icons) — tree-shakeable React SVG icons.
- [`@hobiui/tokens`](https://www.npmjs.com/package/@hobiui/tokens) — CSS design tokens and themes.

See each package README for installation, imports, and examples. The documentation site is at [ui.hobiqora.in](https://ui.hobiqora.in).

## Package releases

Changesets handles package versioning and selective publishing. For a user-facing package change, add a changeset with `npm run changeset` and choose the affected packages and bump type. Commit the generated Markdown file with the code change. You can also add one under `.changeset/` using this format:

```md
---
'@hobiui/react': minor
'@hobiui/tokens': patch
---

Describe the user-visible change.
```

When changesets reach `main`, GitHub Actions opens or updates a version pull request. Merging that pull request publishes only packages with new versions through npm Trusted Publishing (GitHub OIDC).

## Adding a component

1. Add or extend semantic tokens in `packages/tokens/src` when the component needs a shared design value.
2. Implement the reusable component and its styles under `packages/react/src/components`.
3. Export its API from `packages/react/src/index.ts`.
4. Consume and document it from `apps/docs`.
5. Add a registry entry only when copy-and-paste distribution is implemented, and point it to the maintained source.

Import `@hobiui/tokens/index.css` once in each consuming app entry point. Use `packages/icons` for shared icons. Keep documentation-only navigation, page content, and monument artwork in `apps/docs`.

Read [ICON_SYSTEM.md](./ICON_SYSTEM.md) for icon drawing, accessibility, naming, and package guidelines. The current package uses the workspace name `@hobiui/icons`.
