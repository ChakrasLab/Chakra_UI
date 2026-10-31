import { HomeIcon } from "./icons/home";
import { SearchIcon } from "./icons/search";
import { ArrowRightIcon } from "./icons/arrow-right";

export const iconRegistry = {
  home: HomeIcon,
  search: SearchIcon,
  "arrow-right": ArrowRightIcon,
} as const;

export type IconName = keyof typeof iconRegistry;
