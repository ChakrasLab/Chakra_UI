import { useEffect, useState, type ComponentType } from "react";
import "./DocumentationContent.css";

type MdxModule = { default: ComponentType };

const mdxModules = import.meta.glob("../../content/**/*.mdx", {
  eager: true,
}) as Record<string, MdxModule>;

function getDocument(pageId: string) {
  return Object.entries(mdxModules).find(([path]) => path.endsWith(`/${pageId}.mdx`))?.[1].default;
}

export function DocumentationOutline({
  pageId,
  onNavigate,
}: {
  pageId: string;
  onNavigate?: () => void;
}) {
  const [headings, setHeadings] = useState<Array<{ id: string; label: string }>>([]);
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const article = document.querySelector(".hobiui-docs-page");
    const headingElements = Array.from(article?.querySelectorAll<HTMLHeadingElement>("h2[id]") ?? []);
    const nextHeadings = headingElements.map((heading) => ({
      id: heading.id,
      label: heading.textContent?.trim() ?? heading.id,
    }));
    setHeadings(nextHeadings);
    setCurrentSection(nextHeadings[0]?.id ?? "");

    const workspace = document.querySelector(".hobiui-workspace");
    if (!workspace || headingElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const firstVisible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (firstVisible) setCurrentSection(firstVisible.target.id);
    }, { root: workspace, rootMargin: "-8% 0px -76% 0px", threshold: 0 });

    headingElements.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [pageId]);

  if (headings.length === 0) return null;

  return (
    <nav className="docs-outline" aria-label="Page sections">
      {headings.map(({ id, label }) => (
        <a
          href={`#${id}`}
          aria-current={currentSection === id ? "location" : undefined}
          key={id}
          onClick={onNavigate}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

export default function DocumentationContent({ pageId }: { pageId: string }) {
  const Document = getDocument(pageId);

  if (!Document) return null;

  return (
    <article className={`hobiui-docs-page hobiui-docs-page--${pageId}`} key={pageId}>
      <Document />
    </article>
  );
}
