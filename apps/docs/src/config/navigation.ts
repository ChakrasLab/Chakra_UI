import type { ComponentType } from "react";
import type { IconProps } from "@hobiui/icons";
import {
  AccessibilityIcon,
  BoltIcon,
  ButtonIcon,
  CheckboxIcon,
  DialogIcon,
  FolderIcon,
  GlobeIcon,
  GridIcon,
  HomeIcon,
  ImageIcon,
  InfoIcon,
  InputIcon,
  LayersIcon,
  PackageIcon,
  PaletteIcon,
  RadioIcon,
  RefreshIcon,
  SelectIcon,
  SwitchIcon,
  TableIcon,
  TabsIcon,
  TooltipIcon,
  TypeIcon,
} from "@hobiui/icons";

export interface NavigationItem {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
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
      { id: "introduction", label: "Introduction", icon: HomeIcon },
      { id: "installation", label: "Installation", icon: PackageIcon },
      { id: "quick-start", label: "Quick start", icon: BoltIcon },
      { id: "project-structure", label: "Project structure", icon: FolderIcon },
      { id: "migration-guide", label: "Migration guide", icon: RefreshIcon },
    ],
  },
  {
    id: "foundations",
    title: "Foundations",
    items: [
      { id: "design-tokens", label: "Design tokens", icon: LayersIcon },
      { id: "colors", label: "Colors", icon: PaletteIcon },
      { id: "typography", label: "Typography", icon: TypeIcon },
      { id: "spacing-and-layout", label: "Spacing and layout", icon: GridIcon },
      { id: "icons", label: "Icons", icon: ImageIcon },
      { id: "theming", label: "Theming", icon: InfoIcon },
      { id: "accessibility", label: "Accessibility", icon: AccessibilityIcon },
      { id: "localization", label: "Localization", icon: GlobeIcon },
    ],
  },
  {
    id: "components",
    title: "Components",
    items: [
      { id: "button", label: "Button", icon: ButtonIcon },
      { id: "input", label: "Input", icon: InputIcon },
      { id: "select", label: "Select", icon: SelectIcon },
      { id: "checkbox", label: "Checkbox", icon: CheckboxIcon },
      { id: "radio", label: "Radio", icon: RadioIcon },
      { id: "switch", label: "Switch", icon: SwitchIcon },
      { id: "dialog", label: "Dialog", icon: DialogIcon },
      { id: "tabs", label: "Tabs", icon: TabsIcon },
      { id: "tooltip", label: "Tooltip", icon: TooltipIcon },
      { id: "data-table", label: "Data table", icon: TableIcon },
    ],
  },
];
