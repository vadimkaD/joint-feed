import { ABILITIES } from "../Abilities/Abilities.constants";
import { UnitTarget } from "../Effects/Effects.types";
import { Coord } from "../../hexagons/hexagons.types";

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
