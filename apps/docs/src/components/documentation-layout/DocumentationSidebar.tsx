import { ChevronRightIcon } from "@chakra/icons";
import { Button } from "@chakra/react";
import { navigationSections } from "../../config/navigation";
import "./DocumentationSidebar.css";

interface DocumentationSidebarProps {
  navId: string;
  activePage: string;
  searchQuery: string;
  onPageChange: (pageId: string) => void;
}

export default function DocumentationSidebar({
  navId,
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
    <div className="chakra-sidebar-frame">
      <nav
        id={navId}
        className="chakra-sidebar"
        aria-label="Documentation"
      >
        {visibleSections.length > 0 ? (
          visibleSections.map((section) => (
            <section className="chakra-sidebar__section" key={section.id}>
              <h2 className="chakra-sidebar__heading">{section.title}</h2>
              <ul className="chakra-sidebar__items">
                {section.items.map((item) => {
                  const isActive = activePage === item.id;
                  const ItemIcon = item.icon;
                  return (
                    <li key={item.id}>
                      <Button
                        variant="ghost"
                        size="sm"
                        active={isActive}
                        type="button"
                        className="chakra-sidebar__link"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onPageChange(item.id)}
                      >
                        <ItemIcon size={17} className="chakra-nav-icon" />
                        <span>{item.label}</span>
                        {!isActive && (
                          <ChevronRightIcon className="chakra-sidebar__chevron" />
                        )}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        ) : (
          <p className="chakra-sidebar__empty">No pages match “{searchQuery}”.</p>
        )}
      </nav>
    </div>
  );
}
