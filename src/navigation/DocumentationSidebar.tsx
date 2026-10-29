import type { ReactNode } from "react";
import {
  navigationSections,
  type NavigationIconName,
} from "./navigationSections";
import "./DocumentationSidebar.css";

const iconArtwork: Record<NavigationIconName, ReactNode> = {
  home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  package: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="m4.3 7.7 7.7 4.4 7.7-4.4M12 12.1V21" /></>,
  bolt: <path d="M13.2 2 5.5 13h5.8L10.8 22 18.5 11h-5.8z" />,
  folder: <path d="M3 6a1.5 1.5 0 0 1 1.5-1.5h5l2 2H20A1.5 1.5 0 0 1 21.5 8v10a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 18z" />,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.7-2L20 12M4 12l2.7 5a7 7 0 0 0 11.7-2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.5-3.3 1.8 1.8 0 0 1 1.4-3h1.2A4.7 4.7 0 0 0 22 10c0-3.9-4.5-7-10-7Z" /><circle cx="7.5" cy="10" r="1" /><circle cx="10" cy="6.8" r="1" /><circle cx="15" cy="7" r="1" /></>,
  type: <><path d="M5 5h14M12 5v15" /><path d="M9 20h6" /></>,
  grid: <><rect x="4" y="4" width="6" height="6" rx=".5" /><rect x="14" y="4" width="6" height="6" rx=".5" /><rect x="4" y="14" width="6" height="6" rx=".5" /><rect x="14" y="14" width="6" height="6" rx=".5" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="1.5" /><circle cx="8" cy="9" r="1.4" /><path d="m4 17 5-5 3 3 3-4 5 6" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  accessibility: <><circle cx="12" cy="4" r="1.6" /><path d="M5 7.5h14M12 7.7v5.1m0 0-4 7m4-7 4 7M8 9l-2 5m10-5 2 5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  button: <><rect x="5" y="3" width="14" height="18" rx="2" /><rect x="8" y="7" width="8" height="10" rx="1" /></>,
  input: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5M8 16h8" /></>,
  select: <><rect x="3.5" y="5" width="17" height="14" rx="3" /><path d="m8 10 4 4 4-4" /></>,
  checkbox: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="m7.5 12 3 3 6-6" /></>,
  radio: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.2" /></>,
  switch: <><rect x="3" y="6" width="18" height="12" rx="6" /><circle cx="15" cy="12" r="3.5" /></>,
  dialog: <><path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v10a1.5 1.5 0 0 1-1.5 1.5h-7l-5 3v-3H4A1.5 1.5 0 0 1 2.5 16V6A1.5 1.5 0 0 1 4 4.5Z" /><path d="M7 9h10M7 13h7" /></>,
  tabs: <><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="M3 9h18M8 4v5m6-5v5" /></>,
  tooltip: <><path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v10a1.5 1.5 0 0 1-1.5 1.5h-7l-5 3v-3H4A1.5 1.5 0 0 1 2.5 16V6A1.5 1.5 0 0 1 4 4.5Z" /><path d="M12 8v4m0 3h.01" /></>,
  table: <><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="M3 9h18M3 14h18M9 4v16m6-16v16" /></>,
};

function NavigationIcon({ name }: { name: NavigationIconName }) {
  return (
    <svg className="instiui-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      {iconArtwork[name]}
    </svg>
  );
}

interface DocumentationSidebarProps {
  activePage: string;
  searchQuery: string;
  onPageChange: (pageId: string) => void;
}

export default function DocumentationSidebar({
  activePage,
  searchQuery,
  onPageChange,
}: DocumentationSidebarProps) {
  const query = searchQuery.trim().toLocaleLowerCase();
  const visibleSections = query
    ? navigationSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            item.label.toLocaleLowerCase().includes(query),
          ),
        }))
        .filter((section) => section.items.length > 0)
    : navigationSections;

  return (
    <div className="instiui-sidebar-frame">
      <nav
        id="instiui-documentation-sidebar"
        className="instiui-sidebar"
        aria-label="Documentation"
      >
        {visibleSections.length > 0 ? (
          visibleSections.map((section) => (
            <section className="instiui-sidebar__section" key={section.id}>
              <h2 className="instiui-sidebar__heading">{section.title}</h2>
              <ul className="instiui-sidebar__items">
                {section.items.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`instiui-sidebar__link${isActive ? " is-active" : ""}`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onPageChange(item.id)}
                      >
                        <NavigationIcon name={item.icon} />
                        <span>{item.label}</span>
                        {!isActive && (
                          <svg className="instiui-sidebar__chevron" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="m6 3 5 5-5 5" />
                          </svg>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        ) : (
          <p className="instiui-sidebar__empty">No pages match “{searchQuery}”.</p>
        )}
      </nav>
    </div>
  );
}
