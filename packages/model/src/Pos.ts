import type { Node } from "./Node.ts";
import type { ResolvedRange, NodeRange } from "./Range.ts";

export interface AnyPos {
  /** Note that this may not be the root node. Calling `node.resolve(pos)` works for any node. */
  readonly doc: Node;
  readonly pos: number;

  readonly depth: number;
  readonly parent: Node;
  readonly parentPos: NodePos;

  ascend(): Iterable<NodePos>;
  descend(): Iterable<NodePos>;

  withParent(parent: Node, parentPos: NodePos): this;
  withRelative(depth: number): this;

  /** 0 if {@link nodeAfter} points before first child/text of {@link parent}. */
  readonly parentOffset: number;

  get nodeAfter(): Node | null;
  get nodePosAfter(): NodePos | null;
  get afterType(): AdjacentType;

  node(depth?: number): Node;
  index(depth?: number): number;
  start(depth?: number): number;

  nodePos(depth: number): NodePos;
  resolve(depth: number): ResolvedPos;

  rangeTo(other: AnyPos): ResolvedRange;
  nodeRange(other: AnyPos, parentPredicate?: (parent: NodePos) => boolean): NodeRange;
}

/**
 * This points directly to {@link Node}, with resolved position. Node that this cannot point to
 * text, or end of node. You can use {@link ResolvedPos} for general position.
 *
 * Node that this differs from {@link ResolvedPos}. {@link ResolvedPos} is similar to 'cursor',
 * meaning it can point between node and node, start of node and its first child, or so.
 */
export interface NodePos extends AnyPos {
  readonly target: Node;

  /** List of indices. Identical to `[pos.index(0), pos.index(1), ..., pos.index(pos.depth)]`. */
  readonly path: number[];

  childPos(index: number): NodePos;
  resolveChild(index: number): ResolvedPos;

  /**
   * Only works only if {@link target} is leaf node. Result of this points to nth text.
   */
  resolveText(offset: number): ResolvedPos;

  /// from AnyPos
  /**
   * For compatibility with {@link ResolvedPos}, this will return `nodeDepth - 1.
   * @see nodeDepth
   */
  readonly depth: number;
  readonly nodeDepth: number;

  /** Equivalent to {@link target}. */
  get nodeAfter(): Node;
  /** Equivalent to `this`. */
  get nodePosAfter(): NodePos;
  /** Equals to `"nodeStart"`. */
  get afterType(): "nodeStart";

  /** Node that, `node(depth + 1)` or `node(nodeDepth)` will return {@link target}. */
  node(depth?: number): Node;

  /** Node that, `nodePos(depth + 1)` or `nodePos(nodeDepth)` will return `this`. */
  nodePos(depth: number): NodePos;
  resolve(depth?: number): ResolvedPos;
}

export interface ResolvedPos extends AnyPos {
  get nodeBefore(): Node | null;
  get nodPosBefore(): NodePos | null;
  get beforeType(): AdjacentType;
}

type AdjacentType = "nodeStart" | "nodeEnd" | "text";
