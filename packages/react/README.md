# @hobiui/react

Reusable React components for the Hobi UI workspace.

This package is prepared for npm publishing but has not been released yet. After release, install it with:

```sh
npm install @hobiui/react @hobiui/tokens
```

Import the token definitions and component styles once in the app entry point:

```ts
import "@hobiui/tokens/index.css";
import "@hobiui/react/style.css";
```

Then import components and types from the package root:

```tsx
import { Button, Input, Tabs } from "@hobiui/react";
```

React 18 and 19 are supported as peer dependencies.
