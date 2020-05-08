import React from "react";
import { ActionType } from "deox";
import { ABILITIES } from "./Abilities.constants";
import { Coord, Hex, Hexes, HightlightedHexes, PreparedUnit, UnitsOnBoard } from "../Battle/Battle.types";
import { Action } from "../ActionQueue/ActionQueue.types";

export enum Target {
    UNITS = "UNITS",
    AREA = "AREA",
}

export enum EffectType {
    ENEMY = "ENEMY",
    FRIENDLY = "FRIENDLY",
}

export enum AbilityType {
    CHANNELING = "CHANNELING",
    CAST = "CAST",
}

export interface AbilityActionOutlineProps {
    action: Action;
    from?: Coord;
    isLastInChain?: boolean;
    playerUnitsOnBoard: UnitsOnBoard;
}

export type AbilityActionOutline = React.FunctionComponent<AbilityActionOutlineProps>;

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
export type AbilityEffect = AtLeast<PreparedUnit, "id">;
export type AbilityEffector = (action: Action, unitsOnBoard: UnitsOnBoard) => AbilityEffect[];
