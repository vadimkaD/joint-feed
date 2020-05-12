import React from "react";
import { ActionType } from "deox";
import { ABILITIES } from "./Abilities.constants";
import { Hex, Hexes, HightlightedHexes, PreparedUnit, UnitsOnBoard } from "../Battle/Battle.types";
import { Action } from "../ActionQueue/ActionQueue.types";
import { EffectType } from "../Effects/Effects.types";
import { AtLeast } from "../../types";
import { AbilityAnimation } from "../Animations/Animations.types";

export enum Target {
    UNITS = "UNITS",
    AREA = "AREA",
}

export enum AbilityType {
    CHANNELING = "CHANNELING",
    CAST = "CAST",
}

export interface AbilityActionOutlineProps {
    action: Action;
    isLastInChain?: boolean;
    playerUnitsOnBoard: UnitsOnBoard;
}

export type AbilityActionOutline = React.FunctionComponent<AbilityActionOutlineProps>;

export interface AbilityAnimatorProps {
    unitsOnBoard: UnitsOnBoard;
    hexes: Hexes;
    animation: AbilityAnimation;
}

export type AbilityAnimator = React.FunctionComponent<AbilityAnimatorProps>;

export interface Ability {
    id: string;
    castTime: number;
    delay: number;
    target: Target;
    castRange: number;
    iconComponent: React.ComponentType;
    castType: AbilityType;
    getHighlights: GetHighlights;
    onHexClick: ActionType<any>;
    actionOutline: AbilityActionOutline;
    effector: AbilityEffector;
    abilityAnimator: AbilityAnimator;
    effectType: EffectType;
    handleEffect: ActionType<any>;
}

export type SomeAbilities = {
    [key in ABILITIES]?: Ability;
};

export type Abilities = {
    [key in ABILITIES]: Ability;
};

export type AbilityKeys = keyof typeof ABILITIES;

export interface AbilitiesState {
    Abilities: {
        selectedAbility: ABILITIES | null;
    };
}

export type GetHighlights = (
    hexes: Hexes,
    selectedUnit: PreparedUnit,
    unitsOnBoard: UnitsOnBoard,
    hexUnderCursor: Hex | null,
    queue: Action[],
) => HightlightedHexes;

export interface AbilityEffect {
    type: EffectType;
    effect: AtLeast<PreparedUnit, "id">;
}
export type AbilityEffector = (action: Action, unitsOnBoard: UnitsOnBoard) => AbilityEffect[];

export interface AbilityIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}

export interface TransitionProps {
    translateX: number;
    translateY: number;
}
