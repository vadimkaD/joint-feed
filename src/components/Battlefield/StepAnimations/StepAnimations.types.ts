import { Hexes } from "../../../core/Battle/Battle.types";
import { Action } from "../../../core/Actions/Actions.types";
import { UnitsOnBoard } from "../../../core/Battle/Unit.types";
import { AnimationsByAbility } from "../../../core/Animations/Animations.types";

export interface StepAnimationsProps {
    tick: number;
    isAnimation: boolean;
    unitsOnBoard: UnitsOnBoard;
    animationsByAbility: AnimationsByAbility;
    hexes: Hexes;
}

export interface ActionsByUnits {
    [unitId: string]: Action[];
}
