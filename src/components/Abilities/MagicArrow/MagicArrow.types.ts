import { Coord } from "../../Battle/Battle.types";
import { AnimationRecord } from "../../Animations/Animations.types";

export interface MagicArrowAnimationParams {
    from: Coord;
    to: Coord;
}

export interface MagicArrowProjectileProps {
    record: AnimationRecord;
    currentTick: number;
}
