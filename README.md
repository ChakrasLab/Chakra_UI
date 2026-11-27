# Chakra UI

Chakra UI is an npm workspace monorepo. Reusable design-system code lives in `packages/`; the docs site consumes those packages and owns documentation-specific layout and content.

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

- Pull requests to `main` build the workspace packages and documentation site.
- Pushes to `main` build and deploy the site to GitHub Pages at `https://chakraslab.github.io/Chakra_UI/`.
- Dependabot checks npm workspace dependencies and GitHub Actions weekly.
- `npm run build:pages` creates the production site with the GitHub Pages base path.

In repository settings, set Pages' build source to **GitHub Actions** if it is not already enabled.

## npm package releases

`@chakra/tokens`, `@chakra/icons`, and `@chakra/react` now have publishable package builds. A published GitHub Release starts `.github/workflows/publish-packages.yml`, which publishes all three packages with npm provenance using GitHub OIDC.

Before the first release:

1. Confirm the npm account controls the `@chakra` scope used by these package names.
2. Configure npm Trusted Publishing for each package with repository `ChakrasLab/Chakra_UI` and workflow `publish-packages.yml`.
3. Update package versions, then publish a GitHub Release.

The `@chakra` names are kept from the current workspace. Change them to an npm organization you control before release if that scope is not yours.

## Adding a component

1. Add or extend semantic tokens in `packages/tokens/src` when the component needs a shared design value.
2. Implement the reusable component and its styles under `packages/react/src/components`.
3. Export its API from `packages/react/src/index.ts`.
4. Consume and document it from `apps/docs`.
5. Add a registry entry only when copy-and-paste distribution is implemented, and point it to the maintained source.

Import `@chakra/tokens/index.css` once in each consuming app entry point. Use `packages/icons` for shared icons. Keep documentation-only navigation, page content, and monument artwork in `apps/docs`.

Read [ICON_SYSTEM.md](./ICON_SYSTEM.md) for icon drawing, accessibility, naming, and package guidelines. The current package uses the workspace name `@chakra/icons`.
