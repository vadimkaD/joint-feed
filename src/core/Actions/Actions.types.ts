import { Coord } from "../Battle/Hexagon.types";
import { UnitTarget } from "../Battle/Battle.types";
import { ABILITIES } from "../Abilities/Abilities.constants";

export type ActionTarget = Coord[] | UnitTarget[];

export interface Action {
    unitId: string;
    actionId: string;
    tickStart: number;
    target: ActionTarget;
    ability: ABILITIES;
}
