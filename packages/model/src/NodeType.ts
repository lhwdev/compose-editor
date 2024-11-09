import type { Content, ContentMatch, Fragment } from "./Content.ts";
import type { Mark, MarkType } from "./Mark.ts";
import type { Attrs, Node } from "./Node.ts";

export interface NodeType<T extends Node = Node> {
  readonly name: string;
  readonly groups: ReadonlyArray<NodeGroup>;
  matchGroup(group: NodeGroup): boolean;

  readonly kind: "node" | "leaf" | "text";
  readonly isLeaf: boolean;
  readonly isText: boolean;

  readonly contentMatch: ContentMatch;

  readonly allowedMarks: Set<MarkType>;

  create(attrs?: Attrs | null, content?: Content | null, marks?: Mark[] | null): T;
  createChecked(attrs?: Attrs | null, content?: Content | null, marks?: Mark[] | null): T;
  createAndFill(attrs?: Attrs | null, content?: Content | null, marks?: Mark[] | null): T | null;
  createAndFill(attrs?: Attrs | null, content?: null, marks?: Mark[] | null): T;

  validContent(content: Fragment): boolean;
  checkContent(content: Fragment): void;
}

export type NodeGroup = string;
