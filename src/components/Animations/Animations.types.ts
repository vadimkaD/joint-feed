import { Unit } from "../../core/Battle/Unit.types";
import { Animations } from "../../core/Animations/Animations.types";

export interface AnimationsState {
    Animations: {
        animations: Animations;
        animatedUnits: Unit[];
    };
}
