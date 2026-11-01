import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, GithubIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra/icons";
import { InteractivePixels } from "@chakra/react";
import leftRailArtwork from "../../assets/chakra-left-rail.png";
import rightRailArtwork from "../../assets/chakra-right-rail.png";
import { navigationSections } from "../../config/navigation";
import DesignTokensPage, { DesignTokensOutline } from "../../pages/design-tokens/DesignTokensPage";
import ChapterNavigation from "./ChapterNavigation";
import DocumentationSidebar from "./DocumentationSidebar";
import "./ChakraUiShell.css";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileOutlineOpen, setIsMobileOutlineOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const chapters = navigationSections.flatMap((section) => section.items);
  const activeChapterIndex = chapters.findIndex((chapter) => chapter.id === activePage);
  const previousChapter = chapters[activeChapterIndex - 1]?.label;
  const nextChapter = chapters[activeChapterIndex + 1]?.label;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsMobileSearchOpen(true);
        if (window.matchMedia("(max-width: 760px)").matches) {
          setIsMobileMenuOpen(true);
          setIsMobileOutlineOpen(false);
        }
        window.requestAnimationFrame(() => searchInputRef.current?.focus());
      }

      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsMobileOutlineOpen(false);
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMobileSearch = () => {
    const shouldOpen = !isMobileSearchOpen;
    setIsMobileSearchOpen(shouldOpen);
    if (window.matchMedia("(max-width: 760px)").matches) {
      setIsMobileMenuOpen(shouldOpen);
      setIsMobileOutlineOpen(false);
    }
    if (shouldOpen) window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const closeMobilePanels = () => {
    setIsMobileMenuOpen(false);
    setIsMobileOutlineOpen(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <div className="chakra-app" data-theme="light">
      <header className={`chakra-navbar${isMobileSearchOpen ? " is-search-open" : ""}`}>
        <div className="chakra-navbar__identity">
          <div className="chakra-brand" aria-label="Chakra UI">
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
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
          <kbd>Ctrl K</kbd>
        </label>

        <div className="chakra-navbar__icons">
          <button
            className="chakra-mobile-search-toggle"
            type="button"
            aria-label={isMobileSearchOpen ? "Close search" : "Search documentation"}
            aria-expanded={isMobileSearchOpen}
            aria-controls="chakra-docs-search"
            onClick={toggleMobileSearch}
          >
            <SearchIcon />
          </button>
          <span className="chakra-navbar__icon chakra-navbar__icon--sun" aria-hidden="true"><SunIcon /></span>
          <span className="chakra-navbar__icon chakra-navbar__icon--moon" aria-hidden="true"><MoonIcon /></span>
          <span className="chakra-navbar__icon chakra-navbar__icon--github" aria-hidden="true"><GithubIcon /></span>
        </div>
      </header>

      <div className="chakra-layout">
        {(isMobileMenuOpen || isMobileOutlineOpen) && (
          <button
            className="chakra-mobile-backdrop"
            type="button"
            aria-label={isMobileOutlineOpen ? "Close on this page panel" : "Close navigation menu"}
            onClick={closeMobilePanels}
          />
        )}

        <button
          className={`chakra-mobile-menu-toggle${isMobileMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="chakra-documentation-sidebar"
          onClick={() => {
            setIsMobileMenuOpen((open) => !open);
            setIsMobileOutlineOpen(false);
            setIsMobileSearchOpen(false);
          }}
        >
          <MenuIcon isOpen={isMobileMenuOpen} />
        </button>

        <button
          className="chakra-mobile-outline-toggle"
          type="button"
          aria-label={isMobileOutlineOpen ? "Close on this page panel" : "Open on this page panel"}
          aria-expanded={isMobileOutlineOpen}
          aria-controls="chakra-page-outline"
          onClick={() => {
            setIsMobileOutlineOpen((open) => !open);
            setIsMobileMenuOpen(false);
            setIsMobileSearchOpen(false);
          }}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="4" cy="5" r="1" />
            <circle cx="4" cy="10" r="1" />
            <circle cx="4" cy="15" r="1" />
            <path d="M8 5h9M8 10h9M8 15h9" />
          </svg>
          <span>On this page</span>
        </button>

        <div className={`chakra-left-column${isMobileMenuOpen ? " is-mobile-open" : ""}`}>
          <div className="chakra-left-column__art" aria-hidden="true">
            <InteractivePixels
              src={leftRailArtwork}
              className="chakra-rail__pixels"
              ariaLabel="Interactive India Gate pixel artwork"
              objectPosition={{ x: 1, y: 1 }}
            />
          </div>
          <DocumentationSidebar
            activePage={activePage}
            searchQuery={searchQuery}
            onPageChange={(pageId) => {
              setActivePage(pageId);
              closeMobilePanels();
            }}
          />
        </div>

        <main className="chakra-workspace" aria-label="Chakra UI workspace">
          {activePage === "design-tokens" && <DesignTokensPage />}
          <ChapterNavigation previousChapter={previousChapter} nextChapter={nextChapter} />
        </main>

        <aside
          id="chakra-page-outline"
          className={`chakra-page-outline${isMobileOutlineOpen ? " is-mobile-open" : ""}`}
          aria-label="On this page"
        >
          <div className="chakra-page-outline__art" aria-hidden="true">
            <InteractivePixels
              src={rightRailArtwork}
              className="chakra-rail__pixels"
              ariaLabel="Interactive Rashtrapati Bhavan pixel artwork"
              objectPosition={{ x: 0.5, y: 1 }}
              crop={{ left: 2, top: 2 }}
            />
          </div>
          <h2 className="chakra-page-outline__heading">On this page</h2>
          {activePage === "design-tokens" && (
            <DesignTokensOutline
              onNavigate={() => {
                if (window.matchMedia("(max-width: 760px)").matches) {
                  setIsMobileOutlineOpen(false);
                }
              }}
            />
          )}
          <button
            className="chakra-mobile-outline-close"
            type="button"
            aria-label="Close on this page panel"
            onClick={() => setIsMobileOutlineOpen(false)}
          >
            <MenuIcon isOpen />
          </button>
        </aside>
      </div>
    </div>
  );
}
