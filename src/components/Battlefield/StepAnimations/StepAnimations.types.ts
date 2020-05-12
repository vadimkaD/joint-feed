import { Action } from "../../ActionQueue/ActionQueue.types";
import { Animations } from "../../Animations/Animations.types";
import { Hexes, UnitsOnBoard } from "../../Battle/Battle.types";

export interface StepAnimationsProps {
    tick: number;
    isAnimation: boolean;
    unitsOnBoard: UnitsOnBoard;
    animations: Animations;
    hexes: Hexes;
}

export interface ActionsByUnits {
    [unitId: string]: Action[];
}
