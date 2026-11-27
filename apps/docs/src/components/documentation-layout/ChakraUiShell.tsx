import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CloseIcon, GithubIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra/icons";
import { InteractivePixels } from "@chakra/react";
import leftRailArtwork from "../../assets/chakra-left-rail.png";
import leftRailArtworkDark from "../../assets/chakra-left-rail.dark.png";
import rightRailArtwork from "../../assets/chakra-right-rail.png";
import rightRailArtworkDark from "../../assets/chakra-right-rail.dark.png";
import { navigationSections } from "../../config/navigation";
import ChapterNavigation from "./ChapterNavigation";
import DocumentationContent, { DocumentationOutline } from "./DocumentationContent";
import DocumentationSidebar from "./DocumentationSidebar";
import "./ChakraUiShell.css";

type ThemePreference = "system" | "light" | "dark";

function getNextThemePreference(preference: ThemePreference): ThemePreference {
  if (preference === "system") return "light";
  if (preference === "light") return "dark";
  return "system";
}

const logoDots = Array.from({ length: 64 }, (_, index) => {
  const column = index % 8;
  const row = Math.floor(index / 8);
  const isEdge = column === 0 || row === 0 || column === 7 || row === 7;

  return (
    <circle
      key={index}
      cx={3 + column * 3.8}
      cy={3 + row * 3.8}
      r={isEdge ? 1.1 : 1.35}
      opacity={isEdge ? 0.72 : 1}
    />
  );
});

/** Documentation chrome and the site's monument artwork. */
export default function ChakraUiShell() {
  const [activePage, setActivePage] = useState("design-tokens");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const [isMobileOutlineOpen, setIsMobileOutlineOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    const preference = document.documentElement.dataset.themePreference;
    return preference === "light" || preference === "dark" ? preference : "system";
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mobileOutlineTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavigationDialogRef = useRef<HTMLDialogElement | null>(null);
  const mobileOutlineDialogRef = useRef<HTMLDialogElement | null>(null);
  const chapters = navigationSections.flatMap((section) => section.items);
  const activeChapterIndex = chapters.findIndex((chapter) => chapter.id === activePage);
  const previousChapter = chapters[activeChapterIndex - 1];
  const nextChapter = chapters[activeChapterIndex + 1];
  const activeScheme = themePreference === "system"
    ? (systemPrefersDark ? "dark" : "light")
    : themePreference;
  const activeLeftRailArtwork = activeScheme === "dark" ? leftRailArtworkDark : leftRailArtwork;
  const activeRightRailArtwork = activeScheme === "dark" ? rightRailArtworkDark : rightRailArtwork;

  useEffect(() => {
    const schemePreference = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemPreference = () => setSystemPrefersDark(schemePreference.matches);
    updateSystemPreference();
    schemePreference.addEventListener("change", updateSystemPreference);
    return () => schemePreference.removeEventListener("change", updateSystemPreference);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const colorSchemeMeta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    root.dataset.themePreference = themePreference;

    if (themePreference === "system") {
      root.removeAttribute("data-theme");
      if (colorSchemeMeta) colorSchemeMeta.content = "light dark";
      if (themeColorMeta) {
        themeColorMeta.content = getComputedStyle(root).getPropertyValue("--chakra-color-surface-canvas").trim();
      }
      try {
        window.localStorage.removeItem("chakra-color-scheme");
      } catch {
        // The current tab still follows the system preference when storage is unavailable.
      }
    } else {
      root.dataset.theme = themePreference;
      if (colorSchemeMeta) colorSchemeMeta.content = themePreference;
      if (themeColorMeta) {
        themeColorMeta.content = getComputedStyle(root).getPropertyValue("--chakra-color-surface-canvas").trim();
      }
      try {
        window.localStorage.setItem("chakra-color-scheme", themePreference);
      } catch {
        // The current tab still uses the selected theme when storage is unavailable.
      }
    }
  }, [themePreference, systemPrefersDark]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "chakra-color-scheme") return;
      setThemePreference(event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing) return;
      if (event.key === "Escape" && isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
        if (window.matchMedia("(max-width: 47.5em)").matches) {
          window.requestAnimationFrame(() => mobileSearchTriggerRef.current?.focus());
        }
        return;
      }
      if (
        !mobileNavigationDialogRef.current?.open &&
        !mobileOutlineDialogRef.current?.open &&
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setIsMobileSearchOpen(true);
        window.requestAnimationFrame(() => searchInputRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileSearchOpen]);

  const toggleMobileSearch = () => {
    const shouldOpen = !isMobileSearchOpen;
    setIsMobileSearchOpen(shouldOpen);
    if (shouldOpen) window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const openMobileDialog = (dialog: HTMLDialogElement | null) => {
    if (dialog && !dialog.open) dialog.showModal();
    setIsMobileNavigationOpen(dialog === mobileNavigationDialogRef.current);
    setIsMobileOutlineOpen(dialog === mobileOutlineDialogRef.current);
    setIsMobileSearchOpen(false);
  };

  const closeMobileDialogs = () => {
    mobileNavigationDialogRef.current?.close();
    mobileOutlineDialogRef.current?.close();
    setIsMobileNavigationOpen(false);
    setIsMobileOutlineOpen(false);
  };

  const navigateToChapter = (pageId: string) => {
    setActivePage(pageId);
    closeMobileDialogs();
    setIsMobileSearchOpen(false);
  };

  return (
    <div className="chakra-app">
      <a className="chakra-skip-link" href="#chakra-main-content">Skip to main content</a>
      <header className={`chakra-navbar${isMobileSearchOpen ? " is-search-open" : ""}`}>
        <div className="chakra-navbar__identity">
          <div className="chakra-brand">
            <svg className="chakra-brand__mark" viewBox="0 0 33 33" aria-hidden="true">
              {logoDots}
            </svg>
            <span className="chakra-brand__name">Chakra UI</span>
            <span className="chakra-version">
              v0.1.0
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        <label className="chakra-search" htmlFor="chakra-docs-search">
          <SearchIcon />
          <input
            id="chakra-docs-search"
            ref={searchInputRef}
            type="search"
            aria-label="Search documentation"
            aria-keyshortcuts="Control+K Meta+K"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
          <kbd>{navigator.userAgent.includes("Mac") ? "⌘ K" : "Ctrl K"}</kbd>
        </label>

        <div className="chakra-navbar__icons">
          <button
            ref={mobileSearchTriggerRef}
            className="chakra-mobile-search-toggle"
            type="button"
            aria-label={isMobileSearchOpen ? "Close search" : "Search documentation"}
            aria-expanded={isMobileSearchOpen}
            aria-controls="chakra-docs-search"
            onClick={toggleMobileSearch}
          >
            <SearchIcon />
          </button>
          <button
            className="chakra-theme-toggle"
            type="button"
            aria-label={`Theme: ${themePreference}; currently ${activeScheme}. Activate to switch to ${getNextThemePreference(themePreference)} theme.`}
            title={`Theme: ${themePreference}`}
            onClick={() => setThemePreference(getNextThemePreference(themePreference))}
          >
            {activeScheme === "dark" ? <MoonIcon aria-hidden="true" /> : <SunIcon aria-hidden="true" />}
          </button>
          <a
            className="chakra-navbar__github"
            href="https://github.com/ChakrasLab/Chakra_UI"
            target="_blank"
            rel="noreferrer"
            aria-label="Chakra UI on GitHub"
          >
            <GithubIcon aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="chakra-layout">
        <button
          ref={mobileMenuTriggerRef}
          className="chakra-mobile-menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMobileNavigationOpen}
          aria-controls="chakra-mobile-navigation"
          onClick={() => openMobileDialog(mobileNavigationDialogRef.current)}
        >
          <MenuIcon aria-hidden="true" />
        </button>

        <button
          ref={mobileOutlineTriggerRef}
          className="chakra-mobile-outline-toggle"
          type="button"
          aria-label="Open on this page panel"
          aria-expanded={isMobileOutlineOpen}
          aria-controls="chakra-mobile-outline"
          onClick={() => openMobileDialog(mobileOutlineDialogRef.current)}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="4" cy="5" r="1" />
            <circle cx="4" cy="10" r="1" />
            <circle cx="4" cy="15" r="1" />
            <path d="M8 5h9M8 10h9M8 15h9" />
          </svg>
          <span>On this page</span>
        </button>

        <div className="chakra-left-column">
          <div className="chakra-left-column__art" aria-hidden="true">
            <InteractivePixels
              src={activeLeftRailArtwork}
              className="chakra-rail__pixels"
              ariaLabel="Interactive India Gate pixel artwork"
              objectPosition={{ x: 1, y: 1 }}
            />
          </div>
          <DocumentationSidebar
            activePage={activePage}
            searchQuery={searchQuery}
            navId="chakra-documentation-sidebar"
            onPageChange={navigateToChapter}
          />
        </div>

        <dialog
          id="chakra-mobile-navigation"
          ref={mobileNavigationDialogRef}
          className="chakra-mobile-navigation chakra-mobile-drawer"
          aria-label="Documentation navigation"
          onClose={() => setIsMobileNavigationOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
        >
          <div className="chakra-mobile-navigation__art" aria-hidden="true">
            <InteractivePixels
              src={activeLeftRailArtwork}
              className="chakra-rail__pixels"
              ariaLabel="Interactive India Gate pixel artwork"
              objectPosition={{ x: 1, y: 1 }}
            />
          </div>
          <button
            className="chakra-mobile-drawer__close"
            type="button"
            aria-label="Close navigation menu"
            autoFocus
            onClick={() => mobileNavigationDialogRef.current?.close()}
          >
            <CloseIcon aria-hidden="true" />
          </button>
          <DocumentationSidebar
            activePage={activePage}
            searchQuery={searchQuery}
            navId="chakra-mobile-documentation-sidebar"
            onPageChange={navigateToChapter}
          />
        </dialog>

        <main className="chakra-workspace" id="chakra-main-content" tabIndex={-1}>
          <DocumentationContent pageId={activePage} />
          <ChapterNavigation
            previousChapter={previousChapter}
            nextChapter={nextChapter}
            colorScheme={activeScheme}
            onNavigate={navigateToChapter}
          />
        </main>

        <aside
          id="chakra-page-outline"
          className="chakra-page-outline"
          aria-labelledby="chakra-page-outline-heading"
        >
          <div className="chakra-page-outline__art" aria-hidden="true">
            <InteractivePixels
              src={activeRightRailArtwork}
              className="chakra-rail__pixels"
              ariaLabel="Interactive Rashtrapati Bhavan pixel artwork"
              objectPosition={{ x: 0.5, y: 1 }}
              crop={{ left: 2, top: 2 }}
            />
          </div>
          <h2 id="chakra-page-outline-heading" className="chakra-page-outline__heading">On this page</h2>
          <DocumentationOutline pageId={activePage} />
        </aside>

        <dialog
          id="chakra-mobile-outline"
          ref={mobileOutlineDialogRef}
          className="chakra-mobile-outline chakra-mobile-drawer"
          aria-labelledby="chakra-mobile-outline-heading"
          onClose={() => setIsMobileOutlineOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
        >
          <h2 id="chakra-mobile-outline-heading" className="chakra-page-outline__heading">On this page</h2>
          <DocumentationOutline
            pageId={activePage}
            onNavigate={() => mobileOutlineDialogRef.current?.close()}
          />
          <button
            className="chakra-mobile-drawer__close"
            type="button"
            aria-label="Close on this page panel"
            autoFocus
            onClick={() => mobileOutlineDialogRef.current?.close()}
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </dialog>
      </div>
    </div>
  );
}
