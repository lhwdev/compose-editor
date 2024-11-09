import type { Attrs } from "./Node.ts";

export interface Mark {
  type: MarkType;
  attrs: Attrs;
}

export interface MarkType<T extends Mark = Mark> {
  readonly name: string;
  readonly rank: number;

  create(attrs?: Attrs | null): T;
}
