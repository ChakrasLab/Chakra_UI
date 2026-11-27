import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CloseIcon, GithubIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "@hobiui/icons";
import { InteractivePixels } from "@hobiui/react";
import leftRailArtwork from "../../assets/hobiui-left-rail.png";
import leftRailArtworkDark from "../../assets/hobiui-left-rail.dark.png";
import rightRailArtwork from "../../assets/hobiui-right-rail.png";
import rightRailArtworkDark from "../../assets/hobiui-right-rail.dark.png";
import { navigationSections } from "../../config/navigation";
import ChapterNavigation from "./ChapterNavigation";
import DocumentationContent, { DocumentationOutline } from "./DocumentationContent";
import DocumentationSidebar from "./DocumentationSidebar";
import "./HobiUiShell.css";

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
export default function HobiUiShell() {
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
        themeColorMeta.content = getComputedStyle(root).getPropertyValue("--hobiui-color-surface-canvas").trim();
      }
      try {
        window.localStorage.removeItem("hobiui-color-scheme");
      } catch {
        // The current tab still follows the system preference when storage is unavailable.
      }
    } else {
      root.dataset.theme = themePreference;
      if (colorSchemeMeta) colorSchemeMeta.content = themePreference;
      if (themeColorMeta) {
        themeColorMeta.content = getComputedStyle(root).getPropertyValue("--hobiui-color-surface-canvas").trim();
      }
      try {
        window.localStorage.setItem("hobiui-color-scheme", themePreference);
      } catch {
        // The current tab still uses the selected theme when storage is unavailable.
      }
    }
  }, [themePreference, systemPrefersDark]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "hobiui-color-scheme") return;
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
    <div className="hobiui-app">
      <a className="hobiui-skip-link" href="#hobiui-main-content">Skip to main content</a>
      <header className={`hobiui-navbar${isMobileSearchOpen ? " is-search-open" : ""}`}>
        <div className="hobiui-navbar__identity">
          <div className="hobiui-brand">
            <svg className="hobiui-brand__mark" viewBox="0 0 33 33" aria-hidden="true">
              {logoDots}
            </svg>
            <span className="hobiui-brand__name">Hobi UI</span>
            <span className="hobiui-version">
              v0.1.0
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        <label className="hobiui-search" htmlFor="hobiui-docs-search">
          <SearchIcon />
          <input
            id="hobiui-docs-search"
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

        <div className="hobiui-navbar__icons">
          <button
            ref={mobileSearchTriggerRef}
            className="hobiui-mobile-search-toggle"
            type="button"
            aria-label={isMobileSearchOpen ? "Close search" : "Search documentation"}
            aria-expanded={isMobileSearchOpen}
            aria-controls="hobiui-docs-search"
            onClick={toggleMobileSearch}
          >
            <SearchIcon />
          </button>
          <button
            className="hobiui-theme-toggle"
            type="button"
            aria-label={`Theme: ${themePreference}; currently ${activeScheme}. Activate to switch to ${getNextThemePreference(themePreference)} theme.`}
            title={`Theme: ${themePreference}`}
            onClick={() => setThemePreference(getNextThemePreference(themePreference))}
          >
            {activeScheme === "dark" ? <MoonIcon aria-hidden="true" /> : <SunIcon aria-hidden="true" />}
          </button>
          <a
            className="hobiui-navbar__github"
            href="https://github.com/HobiqoraLabs/hobiui"
            target="_blank"
            rel="noreferrer"
            aria-label="Hobi UI on GitHub"
          >
            <GithubIcon aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="hobiui-layout">
        <button
          ref={mobileMenuTriggerRef}
          className="hobiui-mobile-menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMobileNavigationOpen}
          aria-controls="hobiui-mobile-navigation"
          onClick={() => openMobileDialog(mobileNavigationDialogRef.current)}
        >
          <MenuIcon aria-hidden="true" />
        </button>

        <button
          ref={mobileOutlineTriggerRef}
          className="hobiui-mobile-outline-toggle"
          type="button"
          aria-label="Open on this page panel"
          aria-expanded={isMobileOutlineOpen}
          aria-controls="hobiui-mobile-outline"
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

        <div className="hobiui-left-column">
          <div className="hobiui-left-column__art" aria-hidden="true">
            <InteractivePixels
              src={activeLeftRailArtwork}
              className="hobiui-rail__pixels"
              ariaLabel="Interactive India Gate pixel artwork"
              objectPosition={{ x: 1, y: 1 }}
            />
          </div>
          <DocumentationSidebar
            activePage={activePage}
            searchQuery={searchQuery}
            navId="hobiui-documentation-sidebar"
            onPageChange={navigateToChapter}
          />
        </div>

        <dialog
          id="hobiui-mobile-navigation"
          ref={mobileNavigationDialogRef}
          className="hobiui-mobile-navigation hobiui-mobile-drawer"
          aria-label="Documentation navigation"
          onClose={() => setIsMobileNavigationOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
        >
          <div className="hobiui-mobile-navigation__art" aria-hidden="true">
            <InteractivePixels
              src={activeLeftRailArtwork}
              className="hobiui-rail__pixels"
              ariaLabel="Interactive India Gate pixel artwork"
              objectPosition={{ x: 1, y: 1 }}
            />
          </div>
          <button
            className="hobiui-mobile-drawer__close"
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
            navId="hobiui-mobile-documentation-sidebar"
            onPageChange={navigateToChapter}
          />
        </dialog>

        <main className="hobiui-workspace" id="hobiui-main-content" tabIndex={-1}>
          <DocumentationContent pageId={activePage} />
          <ChapterNavigation
            previousChapter={previousChapter}
            nextChapter={nextChapter}
            colorScheme={activeScheme}
            onNavigate={navigateToChapter}
          />
        </main>

        <aside
          id="hobiui-page-outline"
          className="hobiui-page-outline"
          aria-labelledby="hobiui-page-outline-heading"
        >
          <div className="hobiui-page-outline__art" aria-hidden="true">
            <InteractivePixels
              src={activeRightRailArtwork}
              className="hobiui-rail__pixels"
              ariaLabel="Interactive Rashtrapati Bhavan pixel artwork"
              objectPosition={{ x: 0.5, y: 1 }}
              crop={{ left: 2, top: 2 }}
            />
          </div>
          <h2 id="hobiui-page-outline-heading" className="hobiui-page-outline__heading">On this page</h2>
          <DocumentationOutline pageId={activePage} />
        </aside>

        <dialog
          id="hobiui-mobile-outline"
          ref={mobileOutlineDialogRef}
          className="hobiui-mobile-outline hobiui-mobile-drawer"
          aria-labelledby="hobiui-mobile-outline-heading"
          onClose={() => setIsMobileOutlineOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
        >
          <h2 id="hobiui-mobile-outline-heading" className="hobiui-page-outline__heading">On this page</h2>
          <DocumentationOutline
            pageId={activePage}
            onNavigate={() => mobileOutlineDialogRef.current?.close()}
          />
          <button
            className="hobiui-mobile-drawer__close"
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
