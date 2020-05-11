import React from "react";
import { ActionType } from "deox";
import { ABILITIES } from "./Abilities.constants";
import { Hex, Hexes, HightlightedHexes, PreparedUnit, UnitsOnBoard } from "../Battle/Battle.types";
import { Action } from "../ActionQueue/ActionQueue.types";

export enum Target {
    UNITS = "UNITS",
    AREA = "AREA",
}

export enum EffectType {
    DEFENCE_AND_HEAL = "DEFENCE_AND_HEAL",
    TRANSPORT = "TRANSPORT",
    DAMAGE_AND_FIELD_EFFECT = "DAMAGE_AND_FIELD_EFFECT",
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
    action: Action;
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

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export interface AbilityEffect {
    type: EffectType;
    effect: AtLeast<PreparedUnit, "id">;
}
export type AbilityEffector = (action: Action, unitsOnBoard: UnitsOnBoard) => AbilityEffect[];

export interface AbilityIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}
