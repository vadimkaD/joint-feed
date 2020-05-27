import { ABILITIES } from "../Abilities/Abilities.constants";
import { Coord } from "../../core/Hexagons/hexagons.types";
import { UnitTarget } from "../../core/Battle/Battle.types";

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
