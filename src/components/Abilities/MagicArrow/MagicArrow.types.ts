import { AnimationRecord } from "../../Animations/Animations.types";
import { Coord } from "../../../hexagons/hexagons.types";

export interface MagicArrowAnimationParams {
    from: Coord;
    to: Coord;
}

export interface MagicArrowProjectileProps {
    record: AnimationRecord;
    currentTick: number;
}
