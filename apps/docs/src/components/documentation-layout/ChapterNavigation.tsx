import { ArrowLeftIcon, ArrowRightIcon } from "@hobiui/icons";
import footerArtwork from "../../assets/chapter-footer.png";
import darkFooterArtwork from "../../assets/chapter-footer.dark.png";
import "./ChapterNavigation.css";

interface ChapterNavigationProps {
  previousChapter?: { id: string; label: string };
  nextChapter?: { id: string; label: string };
  colorScheme: "light" | "dark";
  onNavigate: (pageId: string) => void;
}

export default function ChapterNavigation({ previousChapter, nextChapter, colorScheme, onNavigate }: ChapterNavigationProps) {
  return (
    <footer className="hobiui-chapter-navigation">
      <nav aria-label="Chapter navigation">
        <div className="hobiui-chapter-navigation__content">
          <div className="hobiui-chapter-navigation__item hobiui-chapter-navigation__item--previous">
            {previousChapter ? (
              <button
                className="hobiui-chapter-navigation__title"
                type="button"
                aria-label={`Previous chapter: ${previousChapter.label}`}
                onClick={() => onNavigate(previousChapter.id)}
              >
                <ArrowLeftIcon aria-hidden="true" />
                {previousChapter.label}
              </button>
            ) : <span className="hobiui-chapter-navigation__fallback">Start of documentation</span>}
          </div>
          <div className="hobiui-chapter-navigation__item hobiui-chapter-navigation__item--next">
            {nextChapter ? (
              <button
                className="hobiui-chapter-navigation__title"
                type="button"
                aria-label={`Next chapter: ${nextChapter.label}`}
                onClick={() => onNavigate(nextChapter.id)}
              >
                {nextChapter.label}
                <ArrowRightIcon aria-hidden="true" />
              </button>
            ) : <span className="hobiui-chapter-navigation__fallback">More chapters coming soon</span>}
          </div>
        </div>
      </nav>
      <img
        className="hobiui-chapter-navigation__art"
        src={colorScheme === "dark" ? darkFooterArtwork : footerArtwork}
        alt=""
        width="674"
        height="108"
        loading="lazy"
        decoding="async"
      />
    </footer>
  );
}
