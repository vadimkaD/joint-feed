import { BaseUnit } from "../Unit/Unit.types";
import { Highlight } from "../Battlefield/Battlefield.constants";
import { Action } from "../ActionQueue/ActionQueue.types";

export enum Owner {
    PLAYER = "PLAYER",
    ENEMY = "ENEMY",
}

export interface BattleUnit {
    coord: Coord;
    id: string;
    owner: Owner;
    currentHp: number;
    currentActionPoints: number;
    maxActionPoints: number;
}

export interface BattleUnitsProps {
    preparedUnits: PreparedUnit[];
    unitsOnBoard: UnitsOnBoard;
}

export interface HexesProps {
    onHexClick(hex: Hex): void;
    onMouseEnterHex(hex: Hex): void;
    hexes: Hexes;
    highlightedHexes: HightlightedHexes;
}

export interface BattleProps extends BattleUnitsProps, HexesProps {
    selectUnit(unitId: string | null): void;
    addUnit(unit: BattleUnit): void;
    playerActions: Action[];
    queue: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
    mouseLeaveBoard: () => void;
    isAnimation: boolean;
}

export interface BattleViewProps extends BattleUnitsProps, HexesProps {
    playerActions: Action[];
    queue: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
    mouseLeaveBoard: () => void;
    isAnimation: boolean;
}

export type BattleState = {
    Battle: {
        battleUnits: BattleUnit[];
        hexes: Hexes;
        hexUnderCursor: Hex;
        isAnimation: boolean;
    };
};

export interface PreparedUnit extends BattleUnit, BaseUnit {}

export interface Hex {
    coord: Coord;
    isEmpty?: boolean;
}

export interface Hexes {
    [coordinates: string]: Hex;
}

export interface Coord {
    x: number;
    y: number;
}

export interface Coords {
    [coordinates: string]: Coord;
}

export interface Cube {
    x: number;
    y: number;
    z: number;
}

export interface UnitsOnBoard {
    [coordinates: string]: PreparedUnit;
}

export interface HightlightedHexes {
    [coordinates: string]: Highlight;
}
