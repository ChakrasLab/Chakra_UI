import { ArrowLeftIcon, ArrowRightIcon } from "@chakra/icons";
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
    <footer className="chakra-chapter-navigation">
      <nav aria-label="Chapter navigation">
        <div className="chakra-chapter-navigation__content">
          <div className="chakra-chapter-navigation__item chakra-chapter-navigation__item--previous">
            {previousChapter ? (
              <button
                className="chakra-chapter-navigation__title"
                type="button"
                aria-label={`Previous chapter: ${previousChapter.label}`}
                onClick={() => onNavigate(previousChapter.id)}
              >
                <ArrowLeftIcon aria-hidden="true" />
                {previousChapter.label}
              </button>
            ) : <span className="chakra-chapter-navigation__fallback">Start of documentation</span>}
          </div>
          <div className="chakra-chapter-navigation__item chakra-chapter-navigation__item--next">
            {nextChapter ? (
              <button
                className="chakra-chapter-navigation__title"
                type="button"
                aria-label={`Next chapter: ${nextChapter.label}`}
                onClick={() => onNavigate(nextChapter.id)}
              >
                {nextChapter.label}
                <ArrowRightIcon aria-hidden="true" />
              </button>
            ) : <span className="chakra-chapter-navigation__fallback">More chapters coming soon</span>}
          </div>
        </div>
      </nav>
      <img
        className="chakra-chapter-navigation__art"
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
