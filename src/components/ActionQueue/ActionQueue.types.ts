import { Coord } from "../Battle/Battle.types";
import { ABILITIES } from "../Abilities/Abilities.constants";
import { UnitTarget } from "../Effects/Effects.types";

export type ActionTarget = Coord[] | UnitTarget[];

export interface Action {
    unitId: string;
    actionId: string;
    tickStart: number;
    target: ActionTarget;
    ability: ABILITIES;
}

export interface ActionQueueState {
    ActionQueue: {
        queue: Action[];
    };
}
