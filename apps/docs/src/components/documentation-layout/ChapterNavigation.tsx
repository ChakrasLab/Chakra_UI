import { ArrowLeftIcon, ArrowRightIcon } from "@chakra/icons";
import footerArtwork from "../../assets/chapter-footer.png";
import "./ChapterNavigation.css";

interface ChapterNavigationProps {
  previousChapter?: string;
  nextChapter?: string;
}

export default function ChapterNavigation({ previousChapter, nextChapter }: ChapterNavigationProps) {
  return (
    <footer className="chakra-chapter-navigation" aria-label="Chapter navigation">
      <div className="chakra-chapter-navigation__content">
        <div className="chakra-chapter-navigation__item chakra-chapter-navigation__item--previous">
          <span className="chakra-chapter-navigation__title">
            {previousChapter && <ArrowLeftIcon aria-hidden="true" />}
            {previousChapter ?? "Start of documentation"}
          </span>
        </div>
        <div className="chakra-chapter-navigation__item chakra-chapter-navigation__item--next">
          <span className="chakra-chapter-navigation__title">
            {nextChapter ?? "More chapters coming soon"}
            {nextChapter && <ArrowRightIcon aria-hidden="true" />}
          </span>
        </div>
      </div>
      <img className="chakra-chapter-navigation__art" src={footerArtwork} alt="" />
    </footer>
  );
}
