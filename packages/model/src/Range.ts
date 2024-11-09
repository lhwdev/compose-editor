import type { AnyPos, NodePos, ResolvedPos } from "./Pos.ts";

export interface AnyRange<Pos extends AnyPos = AnyPos> {
  readonly from: Pos;
  readonly to: Pos;

  readonly fromRelative: Pos;
  readonly toRelative: Pos;

  readonly parent: NodePos;

  walk(): Iterable<AnyRangeElement<Pos>>;
}

export interface AnyRangeElement<Pos extends AnyPos> {
  readonly pos: Pos;
  skip(): void;
}

export interface ResolvedRange extends AnyRange<ResolvedPos> {
}

export interface NodeRange extends AnyRange<NodePos> {

}
