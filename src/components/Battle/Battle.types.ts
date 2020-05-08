import { Unit } from "../Player/Units/Units.types";
import { Highlight } from "../Battlefield/Battlefield.constants";
import { Action } from "../ActionQueue/ActionQueue.types";

export enum Owner {
    PLAYER = "PLAYER",
    ENEMY = "ENEMY",
}

export interface BattleUnit {
    coord: Coord;
    id: number;
    owner: Owner;
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
    selectUnit(unitId: number | null): void;
    addUnit(unit: BattleUnit): void;
    playerActions: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
}

export interface BattleViewProps extends BattleUnitsProps, HexesProps {
    playerActions: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
}

export type BattleState = {
    Battle: {
        battleUnits: BattleUnit[];
        hexes: Hexes;
        hexUnderCursor: Hex;
    };
};

export interface PreparedUnit extends BattleUnit, Unit {}

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
