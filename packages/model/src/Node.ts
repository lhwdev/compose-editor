import type { Fragment } from "./Content.ts";
import type { Mark } from "./Mark.ts";
import type { NodeType } from "./NodeType.ts";
import type { NodePos, ResolvedPos } from "./Pos.ts";
import type { AnyRange } from "./Range.ts";
import type { Slice } from "./Slice.ts";

export type Attrs = Record<string, any>;

export type NodeWithType<Type extends NodeType> = ReturnType<Type["create"]>;

export interface Node {
  /// Types
  readonly type: NodeType;
  isType<Type extends NodeType>(type: Type): this is NodeWithType<Type>;
  asType<Type extends NodeType>(type: Type): NodeWithType<Type> | null;

  /// Attributes
  readonly attrs: Attrs;

  /// Marks
  readonly marks: ReadonlyArray<Mark>;
  hasMarkup(marks: ReadonlyArray<Mark>, attrs?: Attrs | null): boolean;

  /// Content-Node
  readonly content: Fragment;
  get isContentValid(): boolean;
  checkContent(): void;

  readonly isLeaf: boolean;
  get children(): ReadonlyArray<Node>;

  get childCount(): number;
  child(index: number): Node;
  maybeChild(index: number): Node | null;
  descendants(selfPos?: NodePos): Iterable<NodeDescendant>;

  cut(from: number, to?: number): Node;
  slice(from: number, to?: number): Slice;

  /// Content-Leaf
  readonly text?: string;
  readonly isText: boolean;

  /// Pos
  readonly nodeSize: number;

  nodeAt(pos: number): NodePos;
  childAt(pos: number): { index: number; offset: number };
  resolve(pos: number, selfPos?: NodePos): ResolvedPos;

  /// Update
  replace(range: AnyRange, slice: Slice): Node;
}

/** Note: this is reused. */
export interface NodeDescendant {
  readonly node: Node;
  readonly pos: NodePos;

  skip(): void;
}
