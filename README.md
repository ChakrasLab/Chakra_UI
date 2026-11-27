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

## npm package releases

`@hobiui/tokens`, `@hobiui/icons`, and `@hobiui/react` are published independently through Changesets. A changeset records which packages need a patch, minor, or major version bump. When changesets reach `main`, GitHub Actions opens or updates a version pull request. Merging that pull request publishes only packages with new versions. npm Trusted Publishing uses GitHub OIDC and adds provenance automatically.

When a change should be released, add a changeset with `npm run changeset` and select the affected packages and bump type. Commit the generated Markdown file with the code change. You can also add one directly under `.changeset/` using this format:

```md
---
'@hobiui/react': minor
'@hobiui/tokens': patch
---

Describe the user-visible change.
```

Before merging the release workflow into `main`:

1. Confirm the npm account controls the `@hobiui` scope used by these package names.
2. Publish each package once manually to create it on npm, if it does not already exist. npm requires the package to exist before Trusted Publishing can be configured.
3. Configure npm Trusted Publishing for each package with repository `HobiqoraLabs/Chakra_UI` and workflow `publish-packages.yml`.
4. In GitHub Actions settings, allow GitHub Actions to create and approve pull requests. The workflow needs this to open its version pull request.
5. Merge the release workflow into `main`. Add changesets for package changes; the workflow creates a version pull request, and merging that pull request publishes the changed packages.

The `@hobiui` names are kept from the current workspace. Change them to an npm organization you control before release if that scope is not yours.

## Adding a component

1. Add or extend semantic tokens in `packages/tokens/src` when the component needs a shared design value.
2. Implement the reusable component and its styles under `packages/react/src/components`.
3. Export its API from `packages/react/src/index.ts`.
4. Consume and document it from `apps/docs`.
5. Add a registry entry only when copy-and-paste distribution is implemented, and point it to the maintained source.

Import `@hobiui/tokens/index.css` once in each consuming app entry point. Use `packages/icons` for shared icons. Keep documentation-only navigation, page content, and monument artwork in `apps/docs`.

Read [ICON_SYSTEM.md](./ICON_SYSTEM.md) for icon drawing, accessibility, naming, and package guidelines. The current package uses the workspace name `@hobiui/icons`.
