import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import "./tabs.css";

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  "aria-label"?: string;
  className?: string;
}

/** Accessible tabs with automatic arrow-key activation and controlled or uncontrolled state. */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  "aria-label": ariaLabel = "Tabs",
  className = "",
}: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabledItems = items.filter((item) => !item.disabled);
  const firstEnabled = enabledItems[0]?.value ?? "";
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const selectedValue = value ?? internalValue;
  const selectedItem = items.find((item) => item.value === selectedValue && !item.disabled)
    ?? enabledItems[0];

  const selectValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, item: TabItem) => {
    const currentIndex = enabledItems.findIndex((candidate) => candidate.value === item.value);
    let nextIndex = currentIndex;

    if (orientation === "horizontal" && event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabledItems.length;
    else if (orientation === "horizontal" && event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    else if (orientation === "vertical" && event.key === "ArrowDown") nextIndex = (currentIndex + 1) % enabledItems.length;
    else if (orientation === "vertical" && event.key === "ArrowUp") nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = enabledItems.length - 1;
    else return;

    event.preventDefault();
    const nextItem = enabledItems[nextIndex];
    const nextItemIndex = items.findIndex((candidate) => candidate.value === nextItem.value);
    tabRefs.current[nextItemIndex]?.focus();
    selectValue(nextItem.value);
  };

  if (!selectedItem) return null;

  return (
    <div className={`hobiui-tabs hobiui-tabs--${orientation} ${className}`.trim()}>
      <div className="hobiui-tabs__list" role="tablist" aria-label={ariaLabel} aria-orientation={orientation}>
        {items.map((item, index) => {
          const isSelected = item.value === selectedItem.value;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <button
              ref={(node) => { tabRefs.current[index] = node; }}
              className="hobiui-tabs__tab"
              id={tabId}
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectValue(item.value)}
              onKeyDown={(event) => onTabKeyDown(event, item)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item, index) => (
        <div
          className="hobiui-tabs__panel"
          id={`${baseId}-panel-${index}`}
          key={item.value}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          tabIndex={0}
          hidden={item.value !== selectedItem.value}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
