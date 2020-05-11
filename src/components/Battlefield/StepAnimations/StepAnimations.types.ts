import { Action } from "../../ActionQueue/ActionQueue.types";
import { Hexes, UnitsOnBoard } from "../../Battle/Battle.types";

export interface StepAnimationsProps {
    actionsByUnits: ActionsByUnits;
    unitsOnBoard: UnitsOnBoard;
    hexes: Hexes;
    isAnimation: boolean;
}

export interface ActionsByUnits {
    [unitId: string]: Action[];
}
