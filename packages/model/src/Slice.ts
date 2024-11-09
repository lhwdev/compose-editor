import type { Fragment } from "./Content.ts";

export interface Slice {
  openStart: number;
  openEnd: number;
  content: Fragment;
}
