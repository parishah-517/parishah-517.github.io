import type { CSSProperties } from "react";
import type { CardMedia } from "./data";

export function imageMediaStyle(
  media: Extract<CardMedia, { kind: "image" }>
): CSSProperties | undefined {
  const fit = media.objectFit ?? "cover";
  const pos = media.objectPosition;
  if (fit === "cover" && !pos) return undefined;
  return {
    objectFit: fit,
    ...(pos ? { objectPosition: pos } : {})
  };
}
