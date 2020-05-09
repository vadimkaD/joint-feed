import { Coord, PreparedUnit } from "../Battle/Battle.types";
import { ABILITIES } from "../Abilities/Abilities.constants";

export type ActionTarget = Coord | PreparedUnit;

export interface Action {
    unitId: number;
    target: ActionTarget;
    ability: ABILITIES;
}

export interface ActionQueueState {
    ActionQueue: {
        queue: Action[];
    };
}
