import { useEffect, useState, type ReactNode } from "react";
import { ArrowRightIcon, BoxIcon, LayersIcon, TagsIcon } from "@chakra/icons";
import CodeBlock from "../../components/code-block/CodeBlock";
import "./DesignTokensPage.css";

const quickStartCode = `@import "@chakra/tokens/index.css";

.card {
  color: var(--chakra-color-text-primary);
  background: var(--chakra-color-surface-canvas);
}`;

const colorTokens = [
  { name: "--chakra-blue-900", value: "#0b285b", color: "var(--chakra-blue-900)" },
  { name: "--chakra-color-text-primary", value: "#0b285b", color: "var(--chakra-color-text-primary)" },
  { name: "--chakra-color-brand", value: "#062fa8", color: "var(--chakra-color-brand)" },
  { name: "--chakra-color-accent", value: "#ff7416", color: "var(--chakra-color-accent)" },
];

const spacingTokens = [
  { name: "space-1", value: "4px", width: "var(--chakra-space-1)" },
  { name: "space-2", value: "8px", width: "var(--chakra-space-2)" },
  { name: "space-3", value: "12px", width: "var(--chakra-space-3)" },
  { name: "space-4", value: "16px", width: "var(--chakra-space-4)" },
  { name: "space-6", value: "24px", width: "var(--chakra-space-6)" },
  { name: "space-8", value: "32px", width: "var(--chakra-space-8)" },
];

const typeTokens = [
  { name: "font-size-xs", value: "11px", style: "var(--chakra-font-size-xs)" },
  { name: "font-size-sm", value: "12px", style: "var(--chakra-font-size-sm)" },
  { name: "font-size-md", value: "14px", style: "var(--chakra-font-size-md)" },
  { name: "font-size-lg", value: "16px", style: "var(--chakra-font-size-lg)" },
];

const outlineLinks = [
  ["overview", "Overview"],
  ["quick-start", "Quick start"],
  ["token-layers", "Token layers"],
  ["colors", "Colors"],
  ["spacing", "Spacing"],
  ["typography", "Typography"],
  ["radius", "Radius"],
  ["shadows-motion", "Shadows and motion"],
  ["themes", "Themes"],
  ["guidelines", "Guidelines"],
] as const;

function TokenSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="token-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function DesignTokensOutline({ onNavigate }: { onNavigate?: () => void }) {
  const [currentSection, setCurrentSection] = useState("overview");

  useEffect(() => {
    const root = document.querySelector(".chakra-workspace");
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      const firstVisible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (firstVisible) setCurrentSection(firstVisible.target.id);
    }, { root, rootMargin: "-8% 0px -76% 0px", threshold: 0 });

    for (const [id] of outlineLinks) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="token-outline" aria-label="Design tokens sections">
      {outlineLinks.map(([id, label]) => (
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

export default function DesignTokensPage() {
  return (
    <article className="design-tokens-page">
      <header className="token-page-intro" id="overview">
        <h1>Design Tokens</h1>
        <p>
          Design tokens are shared values that power the visual language of Chakra UI. They provide a
          consistent and flexible way to manage color, spacing, typography, and themes across your
          application.
        </p>
      </header>

      <TokenSection id="quick-start" title="Quick start">
        <p>Import the token definitions once, then use semantic CSS properties in your styles.</p>
        <CodeBlock code={quickStartCode} />
      </TokenSection>

      <TokenSection id="token-layers" title="Token layers">
        <p>Chakra's tokens flow from primitive values to semantic tokens, and then to components.</p>
        <div className="token-layer-flow" aria-label="Primitive values flow into semantic tokens and components">
          <div className="token-layer token-layer--primitive">
            <LayersIcon aria-hidden="true" />
            <div><h3>Primitive values</h3><p>Raw values like colors, spacing, and font sizes.</p></div>
          </div>
          <ArrowRightIcon className="token-layer-flow__arrow" aria-hidden="true" />
          <div className="token-layer token-layer--semantic">
            <TagsIcon aria-hidden="true" />
            <div><h3>Semantic tokens</h3><p>Meaningful names for design decisions.</p></div>
          </div>
          <ArrowRightIcon className="token-layer-flow__arrow" aria-hidden="true" />
          <div className="token-layer token-layer--component">
            <BoxIcon aria-hidden="true" />
            <div><h3>Components</h3><p>Use tokens to build consistent UI.</p></div>
          </div>
        </div>
      </TokenSection>

      <TokenSection id="colors" title="Colors">
        <p>Use semantic colors for interface roles and primitive colors when defining a theme.</p>
        <div className="token-table-wrap">
          <table className="token-table">
            <thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Preview</th></tr></thead>
            <tbody>
              {colorTokens.map((token) => (
                <tr key={token.name}>
                  <th scope="row"><code>{token.name}</code></th>
                  <td><code>{token.value}</code></td>
                  <td><span className="color-swatch" role="img" style={{ backgroundColor: token.color }} aria-label={`${token.name}: ${token.value}`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TokenSection>

      <TokenSection id="spacing" title="Spacing">
        <p>Use the spacing scale to keep layout and component gaps consistent.</p>
        <div className="spacing-list">
          {spacingTokens.map((token) => (
            <div className="spacing-row" key={token.name}>
              <code>--chakra-{token.name}</code><span>{token.value}</span>
              <span className="spacing-bar" style={{ width: token.width }} />
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection id="typography" title="Typography">
        <p>Typography tokens use the shared sans-serif family and a compact size scale.</p>
        <div className="type-list">
          {typeTokens.map((token) => (
            <div className="type-row" key={token.name}>
              <code>--chakra-{token.name}</code><span>{token.value}</span>
              <span className="type-sample" style={{ fontSize: token.style }}>Aa</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection id="radius" title="Radius">
        <p>Choose a radius by the role and scale of the surface.</p>
        <div className="radius-list">
          {[["sm", "6px"], ["control", "8px"], ["lg", "12px"], ["pill", "999px"]].map(([name, value]) => (
            <div className="radius-item" key={name}>
              <span className={`radius-sample radius-sample--${name}`} />
              <code>--chakra-radius-{name}</code><span>{value}</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection id="shadows-motion" title="Shadows and motion">
        <p>Use a soft elevation shadow for panels and a short transition for controls.</p>
        <div className="effect-list">
          <div className="effect-sample"><span className="shadow-sample" /><code>--chakra-shadow-panel</code></div>
          <div className="effect-sample"><span className="motion-sample" /><code>--chakra-motion-fast · 140ms</code></div>
        </div>
      </TokenSection>

      <TokenSection id="themes" title="Themes">
        <p>Semantic tokens resolve to the active light or dark theme.</p>
        <div className="theme-previews">
          <div className="theme-preview" data-theme="light"><span>Light theme</span><code>surface-canvas</code></div>
          <div className="theme-preview" data-theme="dark"><span>Dark theme</span><code>surface-canvas</code></div>
        </div>
      </TokenSection>

      <TokenSection id="guidelines" title="Guidelines">
        <ul className="token-guidelines">
          <li>Prefer semantic tokens in component styles.</li>
          <li>Add a primitive only when a value belongs to the shared scale.</li>
          <li>Keep theme changes in semantic mappings instead of component CSS.</li>
        </ul>
      </TokenSection>
    </article>
  );
}
