import { Action } from "../../ActionQueue/ActionQueue.types";
import { AnimationsByAbility } from "../../Animations/Animations.types";
import { Hexes, UnitsOnBoard } from "../../Battle/Battle.types";

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
