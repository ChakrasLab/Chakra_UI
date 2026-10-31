import { useEffect, useRef, useState } from "react";
import leftRailArtwork from "../../assets/chakra-left-rail.png";
import rightRailArtwork from "../../assets/chakra-right-rail.png";
import { InteractivePixels } from "@chakra/react";
import DocumentationSidebar from "./DocumentationSidebar";
import "./ChakraUiShell.css";

const logoDots = Array.from({ length: 64 }, (_, index) => {
  const column = index % 8;
  const row = Math.floor(index / 8);
  const edge = column === 0 || row === 0 || column === 7 || row === 7;

  return (
    <circle
      key={index}
      cx={3 + column * 3.8}
      cy={3 + row * 3.8}
      r={edge ? 1.1 : 1.35}
      opacity={edge ? 0.72 : 1}
    />
  );
});

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1.8v2.3M12 19.9v2.3M4.78 4.78l1.63 1.63m11.18 11.18 1.63 1.63M1.8 12h2.3m15.8 0h2.3M4.78 19.22l1.63-1.63M17.59 6.41l1.63-1.63" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.29-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.67.12 2.96.72.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {isOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

/** The Chakra UI frame and its two edge illustrations. */
export default function ChakraUiShell() {
  const [activePage, setActivePage] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileOutlineOpen, setIsMobileOutlineOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [theme] = useState<"light" | "dark">("light");


  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
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

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const toggleMobileSearch = () => {
    const shouldOpen = !isMobileSearchOpen;
    setIsMobileSearchOpen(shouldOpen);
    if (window.matchMedia("(max-width: 760px)").matches) {
      setIsMobileMenuOpen(shouldOpen);
      setIsMobileOutlineOpen(false);
    }
    if (shouldOpen) {
      window.requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  };

  return (
    <div className="chakra-app" data-theme={theme}>
      <header className={`chakra-navbar${isMobileSearchOpen ? " is-search-open" : ""}`}>
        <div className="chakra-navbar__identity">
          <div className="chakra-brand" aria-label="Chakra UI">
            <svg className="chakra-brand__mark" viewBox="0 0 33 33" aria-hidden="true">
              {logoDots}
            </svg>
            <span className="chakra-brand__name">Chakra UI</span>
            <span className="chakra-version">
              v0.1.0
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="m3 4.5 3 3 3-3" />
              </svg>
            </span>
          </div>
        </div>

        <label className="chakra-search">
          <SearchIcon />
          <input
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
            onClick={toggleMobileSearch}
          >
            <SearchIcon />
          </button>
          <span className="chakra-navbar__icon chakra-navbar__icon--sun " aria-hidden="true"><SunIcon /></span>
          <span className="chakra-navbar__icon chakra-navbar__icon--moon" aria-hidden="true"><MoonIcon /></span>
          <span className="chakra-navbar__icon chakra-navbar__icon--github" aria-hidden="true"><GitHubIcon /></span>
        </div>
      </header>

      <div className="chakra-layout">
        {(isMobileMenuOpen || isMobileOutlineOpen) && (
          <button
            className="chakra-mobile-backdrop"
            type="button"
            aria-label={isMobileOutlineOpen ? "Close on this page panel" : "Close navigation menu"}
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsMobileOutlineOpen(false);
              setIsMobileSearchOpen(false);
            }}
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
            const shouldOpen = !isMobileOutlineOpen;
            setIsMobileOutlineOpen(shouldOpen);
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
              setIsMobileMenuOpen(false);
              setIsMobileOutlineOpen(false);
              setIsMobileSearchOpen(false);
            }}
          />
        </div>
        <main className="chakra-workspace" aria-label="Chakra UI workspace" />
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
