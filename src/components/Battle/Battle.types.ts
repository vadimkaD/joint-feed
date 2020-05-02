import { Unit } from "../Player/Units/Units.types";

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

export enum WayThrough {
    LEFT_TO_RIGHT = 0,
    LEFT_TOP_TO_RIGHT_BOTTOM = 1,
    LEFT_BOTTOM_TO_RIGHT_TOP = 9,
    LEFT_TOP_TO_RIGHT = 2,
    LEFT_TOP_TO_RIGHT_TOP = 3,
    LEFT_TOP_TO_LEFT_BOTTOM = 4,
    LEFT_TOP_TO_LEFT = 5,
    LEFT_TO_RIGHT_TOP = 6,
    LEFT_TO_RIGHT_BOTTOM = 7,
    LEFT_TO_LEFT_BOTTOM = 8,
    LEFT_TO_LEFT_TOP = 5,
    LEFT_BOTTOM_TO_LEFT_TOP = 4,
    LEFT_BOTTOM_TO_LEFT = 8,
    LEFT_BOTTOM_TO_RIGHT = 13,
    LEFT_BOTTOM_TO_RIGHT_BOTTOM = 14,
    RIGHT_TO_LEFT = 0,
    RIGHT_BOTTOM_TO_LEFT_TOP = 1,
    RIGHT_TO_LEFT_TOP = 2,
    RIGHT_TOP_TO_LEFT_TOP = 3,
    RIGHT_TOP_TO_LEFT = 6,
    RIGHT_BOTTOM_TO_LEFT = 7,
    RIGHT_TOP_TO_LEFT_BOTTOM = 9,
    RIGHT_TOP_TO_RIGHT = 10,
    RIGHT_TO_RIGHT_TOP = 10,
    RIGHT_TOP_TO_RIGHT_BOTTOM = 11,
    RIGHT_BOTTOM_TO_RIGHT_TOP = 11,
    RIGHT_TO_RIGHT_BOTTOM = 12,
    RIGHT_BOTTOM_TO_RIGHT = 12,
    RIGHT_TO_LEFT_BOTTOM = 13,
    RIGHT_BOTTOM_TO_LEFT_BOTTOM = 14,
    CENTER_TO_LEFT_BOTTOM,
    CENTER_TO_RIGHT_BOTTOM,
    CENTER_TO_RIGHT,
    CENTER_TO_RIGHT_TOP,
    CENTER_TO_LEFT_TOP,
    CENTER_TO_LEFT,
}

export type ActionPoint = number;

export interface RoutePoint {
    coord: Coord;
    type: WayThrough | ActionPoint | null;
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
    [coordinates: string]: WayThrough | boolean;
}
