import type { NavigationIconName } from "@chakra/icons";

export type { NavigationIconName } from "@chakra/icons";

export interface NavigationItem {
  id: string;
  label: string;
  icon: NavigationIconName;
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

/**
 * Add documentation pages here. The sidebar renders every section and item
 * from this map, so new entries appear automatically without layout changes.
 */
export const navigationSections: NavigationSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction", icon: "home" },
      { id: "installation", label: "Installation", icon: "package" },
      { id: "quick-start", label: "Quick start", icon: "bolt" },
      { id: "project-structure", label: "Project structure", icon: "folder" },
      { id: "migration-guide", label: "Migration guide", icon: "refresh" },
    ],
  },
  {
    id: "foundations",
    title: "Foundations",
    items: [
      { id: "design-tokens", label: "Design tokens", icon: "layers" },
      { id: "colors", label: "Colors", icon: "palette" },
      { id: "typography", label: "Typography", icon: "type" },
      { id: "spacing-and-layout", label: "Spacing and layout", icon: "grid" },
      { id: "icons", label: "Icons", icon: "image" },
      { id: "theming", label: "Theming", icon: "info" },
      { id: "accessibility", label: "Accessibility", icon: "accessibility" },
      { id: "localization", label: "Localization", icon: "globe" },
    ],
  },
  {
    id: "components",
    title: "Components",
    items: [
      { id: "button", label: "Button", icon: "button" },
      { id: "input", label: "Input", icon: "input" },
      { id: "select", label: "Select", icon: "select" },
      { id: "checkbox", label: "Checkbox", icon: "checkbox" },
      { id: "radio", label: "Radio", icon: "radio" },
      { id: "switch", label: "Switch", icon: "switch" },
      { id: "dialog", label: "Dialog", icon: "dialog" },
      { id: "tabs", label: "Tabs", icon: "tabs" },
      { id: "tooltip", label: "Tooltip", icon: "tooltip" },
      { id: "data-table", label: "Data table", icon: "table" },
    ],
  },
];
