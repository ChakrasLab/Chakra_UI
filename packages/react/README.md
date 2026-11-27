# @chakra/react

Reusable React components for the Chakra UI workspace.

This package is prepared for npm publishing but has not been released yet. After release, install it with:

```sh
npm install @chakra/react @chakra/tokens
```

Import the token definitions and component styles once in the app entry point:

```ts
import "@chakra/tokens/index.css";
import "@chakra/react/style.css";
```

Then import components and types from the package root:

```tsx
import { Button, Input, Tabs } from "@chakra/react";
```

React 18 and 19 are supported as peer dependencies.
