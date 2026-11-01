import type { SVGProps } from "react";
import { Icon } from "../icon";

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></Icon>;
}

export function TagsIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m20.6 13.4-7.2 7.2a2 2 0 0 1-2.8 0L3 13V4h9l8.6 6.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="8.5" r="1" /></Icon>;
}

export function BoxIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="m4.3 7.7 7.7 4.4 7.7-4.4M12 12.1V21" /></Icon>;
}

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></Icon>;
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
}
