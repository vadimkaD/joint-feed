import { ABILITIES } from "../Abilities/Abilities.constants";
import { Coord } from "../../core/Hexagons/hexagons.types";
import { Unit } from "../../core/Battle/Battle.types";

export enum AnimationsTypes {
    UNIT_TRANSPORT = "UNIT_TRANSPORT",
    PROJECTILE = "PROJECTILE",
}

interface BaseAbilityAnimation {
    animationId: string;
    ability: ABILITIES;
    tick: number;
}

export interface UnitTransportAnimation extends BaseAbilityAnimation {
    targetUnitId: string;
    departure: Coord;
    destination: Coord;
    type: AnimationsTypes.UNIT_TRANSPORT;
}

export interface ProjectileAnimation extends BaseAbilityAnimation {
    departure: Coord;
    destination: Coord;
    type: AnimationsTypes.PROJECTILE;
}

export type AbilityAnimation = UnitTransportAnimation | ProjectileAnimation;

export interface Animations {
    [tick: number]: AbilityAnimation[];
}

export type AnimationsByAbility = {
    [key in ABILITIES]?: AnimationRecord[];
};

export interface AnimationRecord {
    tick: number;
    animation: AbilityAnimation;
}
export interface AnimationsState {
    Animations: {
        animations: Animations;
        animatedUnits: Unit[];
    };
}
