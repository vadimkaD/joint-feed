import { Hex, PreparedUnit } from "../Battle/Battle.types";

export enum ActionType {
    MOVE,
    USE_ABILITY,
}

export interface Action {
    unitId: number;
    actionType: ActionType;
    target: Hex | PreparedUnit;
    abilityId?: number;
}

export interface MoveAction extends Action {
    unitId: number;
    actionType: ActionType.MOVE;
    target: Hex;
}

export interface CastAreaAction extends Action {
    unitId: number;
    actionType: ActionType.USE_ABILITY;
    target: Hex;
    abilityId: number;
}

export interface CastUnitAction extends Action {
    unitId: number;
    actionType: ActionType.USE_ABILITY;
    target: PreparedUnit;
    abilityId: number;
}
