# Swadesh UI

Swadesh UI is a React and TypeScript foundation for the UI library project. The current page recreates the supplied documentation-shell reference, including the top bar, mapped navigation sections, and interactive Indian monument artwork. The center stays empty for later content.

## Start the project

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## Structure

- `src/layout/InstiUiShell.tsx` renders the navbar and three-column workspace frame.
- `src/layout/InstiUiShell.css` controls the column proportions, borders, navbar, and responsive behavior.
- `src/navigation/navigationSections.ts` is the navigation map. Add a section or page there and the sidebar renders it automatically.
- `src/navigation/DocumentationSidebar.tsx` maps the section data to icon links and active-page state.
- `src/navigation/DocumentationSidebar.css` styles the section headings, dividers, page links, and selected row.
- `src/assets/instiui-left-rail.png` and `src/assets/instiui-right-rail.png` preserve the monument and tricolor dither artwork from the supplied visual reference.
- `src/components/InteractivePixels.tsx` applies the localized pointer ripple to the two rails and can be reused for other raster artwork.
- `src/App.tsx` mounts the workspace frame only.

The left and right artwork respond independently to pointer movement with a localized ripple. The rail artwork is kept as reference-matched images; separate transparent monument layers would be needed for monument-only motion later. The navigation search filters page labels and can be focused with Ctrl K.
