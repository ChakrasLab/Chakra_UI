import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { Button } from "@chakra/react";
import type { IconProps } from "@chakra/icons";
import {
  AccessibilityIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BoltIcon,
  BoxIcon,
  ButtonIcon,
  CheckIcon,
  CheckboxIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  CopyIcon,
  DialogIcon,
  ErrorIcon,
  FolderIcon,
  GithubIcon,
  GlobeIcon,
  GridIcon,
  HomeIcon,
  ImageIcon,
  InfoIcon,
  InputIcon,
  LayersIcon,
  LoadingIcon,
  MenuIcon,
  MoonIcon,
  PackageIcon,
  PaletteIcon,
  RadioIcon,
  RefreshIcon,
  SearchIcon,
  SelectIcon,
  SuccessIcon,
  SunIcon,
  SwitchIcon,
  TableIcon,
  TabsIcon,
  TagsIcon,
  TooltipIcon,
  TypeIcon,
  WarningIcon,
} from "@chakra/icons";
import "./IconCatalog.css";

type IconCategory = "Core UI" | "Navigation" | "Forms" | "Feedback";

interface IconCatalogItem {
  name: string;
  category: IconCategory;
  description: string;
  keywords: string;
  snippet: string;
  Icon: ComponentType<IconProps>;
}

function iconItem(
  name: string,
  category: IconCategory,
  description: string,
  keywords: string,
  Icon: ComponentType<IconProps>,
): IconCatalogItem {
  return {
    name,
    category,
    description,
    keywords,
    snippet: `import { ${name} } from "@chakra/icons";\n\n<${name} size={20} aria-hidden="true" />`,
    Icon,
  };
}

const iconItems: IconCatalogItem[] = [
  iconItem("SearchIcon", "Core UI", "Search", "find query", SearchIcon),
  iconItem("CopyIcon", "Core UI", "Copy", "duplicate clipboard", CopyIcon),
  iconItem("CheckIcon", "Core UI", "Check mark", "done selected", CheckIcon),
  iconItem("BoxIcon", "Core UI", "Box", "package cube", BoxIcon),
  iconItem("LayersIcon", "Core UI", "Layers", "stack tokens", LayersIcon),
  iconItem("TagsIcon", "Core UI", "Tag", "label token", TagsIcon),
  iconItem("SunIcon", "Core UI", "Sun", "light theme", SunIcon),
  iconItem("MoonIcon", "Core UI", "Moon", "dark theme", MoonIcon),
  iconItem("GithubIcon", "Core UI", "GitHub mark", "source repository", GithubIcon),
  iconItem("DialogIcon", "Core UI", "Dialog", "message overlay", DialogIcon),
  iconItem("TabsIcon", "Core UI", "Tabs", "sections panels", TabsIcon),
  iconItem("TooltipIcon", "Core UI", "Tooltip", "help hint", TooltipIcon),
  iconItem("TableIcon", "Core UI", "Table", "grid data", TableIcon),
  iconItem("PaletteIcon", "Core UI", "Palette", "color theme", PaletteIcon),
  iconItem("TypeIcon", "Core UI", "Type", "text typography", TypeIcon),
  iconItem("ImageIcon", "Core UI", "Image", "media picture", ImageIcon),
  iconItem("AccessibilityIcon", "Core UI", "Accessibility", "inclusive access", AccessibilityIcon),
  iconItem("GlobeIcon", "Core UI", "Globe", "locale language", GlobeIcon),
  iconItem("HomeIcon", "Navigation", "Home", "start landing", HomeIcon),
  iconItem("PackageIcon", "Navigation", "Package", "install library", PackageIcon),
  iconItem("BoltIcon", "Navigation", "Bolt", "quick start", BoltIcon),
  iconItem("FolderIcon", "Navigation", "Folder", "project files", FolderIcon),
  iconItem("RefreshIcon", "Navigation", "Refresh", "reload retry", RefreshIcon),
  iconItem("GridIcon", "Navigation", "Grid", "layout overview", GridIcon),
  iconItem("ArrowLeftIcon", "Navigation", "Arrow left", "back previous", ArrowLeftIcon),
  iconItem("ArrowRightIcon", "Navigation", "Arrow right", "forward next", ArrowRightIcon),
  iconItem("ChevronLeftIcon", "Navigation", "Chevron left", "collapse previous", ChevronLeftIcon),
  iconItem("ChevronRightIcon", "Navigation", "Chevron right", "expand next", ChevronRightIcon),
  iconItem("ChevronUpIcon", "Navigation", "Chevron up", "collapse upward", ChevronUpIcon),
  iconItem("ChevronDownIcon", "Navigation", "Chevron down", "expand downward", ChevronDownIcon),
  iconItem("MenuIcon", "Navigation", "Menu", "navigation panel", MenuIcon),
  iconItem("CloseIcon", "Navigation", "Close", "dismiss exit", CloseIcon),
  iconItem("ButtonIcon", "Forms", "Button", "action control", ButtonIcon),
  iconItem("InputIcon", "Forms", "Input", "text field", InputIcon),
  iconItem("SelectIcon", "Forms", "Select", "dropdown option", SelectIcon),
  iconItem("CheckboxIcon", "Forms", "Checkbox", "checked choice", CheckboxIcon),
  iconItem("RadioIcon", "Forms", "Radio", "single choice", RadioIcon),
  iconItem("SwitchIcon", "Forms", "Switch", "toggle setting", SwitchIcon),
  iconItem("SuccessIcon", "Feedback", "Success", "complete positive", SuccessIcon),
  iconItem("WarningIcon", "Feedback", "Warning", "caution attention", WarningIcon),
  iconItem("ErrorIcon", "Feedback", "Error", "failure invalid", ErrorIcon),
  iconItem("InfoIcon", "Feedback", "Information", "details help", InfoIcon),
  iconItem("LoadingIcon", "Feedback", "Loading", "progress refresh", LoadingIcon),
];

const categories: IconCategory[] = ["Core UI", "Navigation", "Forms", "Feedback"];

export default function IconCatalog() {
  const [query, setQuery] = useState("");
  const [copiedIcon, setCopiedIcon] = useState("");
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimeoutRef.current), []);

  const groups = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filtered = iconItems.filter((item) =>
      `${item.name} ${item.category} ${item.description} ${item.keywords}`
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    );

    return categories
      .map((category) => ({
        category,
        icons: filtered.filter((item) => item.category === category),
      }))
      .filter((group) => group.icons.length > 0);
  }, [query]);

  const copySnippet = async (item: IconCatalogItem) => {
    try {
      await navigator.clipboard.writeText(item.snippet);
      window.clearTimeout(copyTimeoutRef.current);
      setCopiedIcon(item.name);
      setCopyFailed(false);
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedIcon((current) => current === item.name ? "" : current);
        copyTimeoutRef.current = undefined;
      }, 1800);
    } catch {
      setCopiedIcon("");
      setCopyFailed(true);
    }
  };

  return (
    <div className="chakra-icon-catalog">
      <label className="chakra-icon-catalog__search">
        <SearchIcon aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search icons..."
          aria-label="Search icons"
        />
        <span>{groups.reduce((total, group) => total + group.icons.length, 0)} icons</span>
      </label>

      {groups.length > 0 ? groups.map(({ category, icons }) => (
        <section className="chakra-icon-catalog__group" key={category}>
          <h3>{category}</h3>
          <div className="chakra-icon-catalog__grid">
            {icons.map((item) => (
              <div className="chakra-icon-catalog__item" key={item.name}>
                <span className="chakra-icon-catalog__preview"><item.Icon aria-hidden="true" /></span>
                <code>{item.name}</code>
                <span className="chakra-icon-catalog__description">{item.description}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="chakra-icon-catalog__copy"
                  type="button"
                  aria-label={copiedIcon === item.name ? `${item.name} copied` : `Copy ${item.name} example`}
                  title="Copy import and JSX"
                  onClick={() => void copySnippet(item)}
                >
                  {copiedIcon === item.name ? <CheckIcon /> : <CopyIcon />}
                </Button>
              </div>
            ))}
          </div>
        </section>
      )) : (
        <p className="chakra-icon-catalog__empty">No icons match “{query}”.</p>
      )}

      <span className="chakra-icon-catalog__status" role="status" aria-live="polite">
        {copyFailed ? "Copy failed. Check clipboard permissions and try again." : copiedIcon ? `${copiedIcon} example copied.` : ""}
      </span>
    </div>
  );
}
