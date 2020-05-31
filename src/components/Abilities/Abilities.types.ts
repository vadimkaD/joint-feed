import React from "react";
import { AnimationRecord } from "../Animations/Animations.types";
import { Unit, UnitsOnBoard } from "../../core/Battle/Unit.types";
import { Action } from "../../core/Actions/Actions.types";
import { ABILITIES } from "../../core/Battle/Abilities.constants";
import { Hex, Hexes } from "../../core/Battle/Battle.types";
import { HightlightedHexes } from "../Battle/Battle.types";
import { ActionType } from "deox";

export interface AbilityActionOutlineProps {
    action: Action;
    isLastInChain?: boolean;
    playerUnitsOnBoard: UnitsOnBoard;
}

export type AbilityActionOutline = React.FunctionComponent<AbilityActionOutlineProps>;

export interface AbilityAnimatorProps {
    animationRecords: AnimationRecord[];
}

export type AbilityAnimator = React.FunctionComponent<AbilityAnimatorProps>;

export type AbilityKeys = keyof typeof ABILITIES;

export interface AbilityIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}

export interface TransitionProps {
    translateX: number;
    translateY: number;
}

export interface HiddenProps {
    isHidden: boolean;
}

export type GetHighlights = (
    hexes: Hexes,
    selectedUnit: Unit,
    unitsOnBoard: UnitsOnBoard,
    hexUnderCursor: Hex | null,
    queue: Action[],
) => HightlightedHexes;

export interface UIAbility {
    ability: ABILITIES;
    iconComponent: React.ComponentType;
    getHighlights: GetHighlights;
    onHexClick: ActionType<any>;
    actionOutline: AbilityActionOutline;
    abilityAnimator: AbilityAnimator;
    handleEffect: ActionType<any>;
}

export type UIAbilities = {
    [key in ABILITIES]: UIAbility;
};
