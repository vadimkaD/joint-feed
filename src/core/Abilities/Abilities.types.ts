import { Effect, EffectType, Hex, Hexes, UnitTarget } from "../Battle/Battle.types";
import { Action } from "../Actions/Actions.types";
import { Unit } from "../Battle/Unit.types";
import { ABILITIES } from "../Battle/Abilities.constants";
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
    effectType: EffectType;
    getSelectionArea: (sourceUnit: Unit, hexes: Hexes, units: Unit[], queue: Action[]) => Coord[];
    canCast: (unit: Unit, targetHex: Hex, units: Unit[], hexes: Hexes) => boolean;
    getActions: (unit: Unit, targetHex: Hex, units: Unit[], hexes: Hexes, queue: Action[], tick: number) => Action[];
    canApplyEffect: (unit: Unit, action: Action) => boolean;
    getEffect: (a: Action, units: Unit[], hexes: Hexes, tick: number) => Effect;
}

export type Abilities = {
    [key in ABILITIES]: Ability;
};
