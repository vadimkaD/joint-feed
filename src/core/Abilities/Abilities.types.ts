import { Effect, Hexes } from "../Battle/Battle.types";
import { Action, ActionTarget } from "../Actions/Actions.types";
import { Unit } from "../Battle/Unit.types";
import { ABILITIES } from "./Abilities.constants";
import { Coord } from "../Battle/Hexagon.types";

export enum Target {
    UNITS = "UNITS",
    AREA = "AREA",
}

export enum AbilityType {
    CHANNELING = "CHANNELING",
    CAST = "CAST",
}

export interface Ability {
    id: ABILITIES;
    castTime: number;
    delay: number;
    target: Target;
    castRange: number;
    castType: AbilityType;
    getSelectionArea: (sourceUnit: Unit, hexes: Hexes, units: Unit[], queue: Action[]) => Coord[];
    getAction: (target: ActionTarget) => Action;
    getEffect: (a: Action, units: Unit[], hexes: Hexes, tick: number) => Effect | null;
}

export type Abilities = {
    [key in ABILITIES]: Ability;
};
