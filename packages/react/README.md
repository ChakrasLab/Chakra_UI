# @hobiui/react

Accessible React components styled with the Hobi UI design tokens.

## Install

```sh
npm install @hobiui/react @hobiui/tokens
```

Hobi UI supports React 18 and 19. The React package declares React and `@hobiui/tokens` as peer dependencies. If your application already uses React, keep one shared React installation.

## Setup

Import both stylesheets once from your application entry point, such as `src/main.tsx`:

```tsx
import "@hobiui/tokens/index.css";
import "@hobiui/react/style.css";
```

The token stylesheet provides the semantic CSS variables used by the component styles. You can customize the semantic values in your own stylesheet:

```css
:root {
  --hobiui-color-brand: #3157c8;
}
```

## Use components

```tsx
import { Button, Input, Tabs, type ButtonProps } from "@hobiui/react";

export function Example() {
  const buttonProps: ButtonProps = { variant: "solid", size: "md" };

  return (
    <>
      <Button {...buttonProps}>Save changes</Button>
      <Input aria-label="Project name" placeholder="Project name" />
      <Tabs
        items={[
          { value: "overview", label: "Overview", content: "Project overview" },
          { value: "activity", label: "Activity", content: "Recent activity" },
        ]}
      />
    </>
  );
}
```

The package also exports Checkbox, DataTable, Dialog, Radio, Select, Switch, Tooltip, and InteractivePixels, along with each component's public prop types. TypeScript declarations are included. TypeScript applications should have `@types/react` installed.

## Links

- [Documentation](https://ui.hobiqora.in)
- [Source and issue tracker](https://github.com/HobiqoraLabs/hobiui)
- [License](./LICENSE)
