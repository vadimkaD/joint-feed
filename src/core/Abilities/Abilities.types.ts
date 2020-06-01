import { Effect, EffectType, Hex, Hexes } from "../Battle/Battle.types";
import { Action } from "../Actions/Actions.types";
import { Unit } from "../Battle/Unit.types";
import { ABILITIES } from "../Battle/Abilities.constants";
import { Coord } from "../Battle/Hexagon.types";
import { AbilityAnimation, AnimationProps } from "../Animations/Animations.types";

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
    canCreateEffect: (unit: Unit, action: Action) => boolean;
    getEffect: (a: Action, units: Unit[], hexes: Hexes, tick: number) => Effect;
    getAnimation: (props: AnimationProps) => AbilityAnimation;
}

export type Abilities = {
    [key in ABILITIES]: Ability;
};
