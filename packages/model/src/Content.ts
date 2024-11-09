import type { Node } from "./Node.ts";
import type { NodeType } from "./NodeType.ts";
import type { NodePos, ResolvedPos } from "./Pos.ts";
import type { AnyRange } from "./Range.ts";
import type { Slice } from "./Slice.ts";

export type Content = Fragment | Node | ReadonlyArray<Node>;

export class Fragment {
  readonly children: ReadonlyArray<Node>;
  readonly size: number;

  constructor(
    children: ReadonlyArray<Node>,
    size?: number,
  ) {
    this.children = children;

    if(size) {
      this.size = size;
    } else {
      size = 0;
      for(const child of children) {
        size += child.nodeSize;
      }
      this.size = size;
    }
  }

  cut(from: number, to?: number): Fragment {

  }
  slice(from: number, to?: number): Slice;

  nodeAt(pos: number): NodePos;
  childAt(pos: number): { index: number; offset: number };
  resolve(pos: number, selfPos?: NodePos): ResolvedPos;

  /// Update
  replace(range: AnyRange, slice: Slice): Node;
}

export interface ContentMatch {
  readonly validEnd: boolean;

  match(next: NodeType): ContentMatch | null;

  matchType(types: NodeType[]): ContentMatch | null;
  matchFragment(content: Fragment): ContentMatch | null;
}
