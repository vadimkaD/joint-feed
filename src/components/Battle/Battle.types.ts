import { Unit } from "../Player/Units/Units.types";
import { Highlight } from "../Battlefield/Battlefield.constants";

export enum Owner {
    PLAYER,
    ENEMY,
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
    selectUnit(unit: PreparedUnit | null): void;
    addUnit(unit: BattleUnit): void;
}

export interface BattleViewProps extends BattleUnitsProps, HexesProps {}

export interface BattleLineProps extends HexesProps {
    lineNumber: number;
    unitsOnBoard: UnitsOnBoard;
}

export interface LineContainerProps {
    lineNumber: number;
    width: number;
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

export type ActionPoint = number;

export interface RoutePoint {
    coord: Coord;
    type: ActionPoint | null;
}

export enum Direction {
    LEFT,
    LEFT_TOP,
    RIGHT_TOP,
    RIGHT,
    RIGHT_BOTTOM,
    LEFT_BOTTOM,
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
