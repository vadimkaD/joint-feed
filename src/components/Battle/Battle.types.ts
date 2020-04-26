import { Unit } from "../Player/Units/Units.types";

export enum Owner {
    PLAYER,
    ENEMY,
}

export interface BattleUnit {
    x: number;
    y: number;
    id: number;
    owner: Owner;
    currentActionPoints: number;
    maxActionPoints: number;
}

export interface BattleUnitsProps {
    preparedUnits: PreparedUnit[];
}

export interface BattleProps extends BattleUnitsProps {
    selectUnit(unit: PreparedUnit | null): void;
    addUnit(unit: BattleUnit): void;
    onHexClick(hex: Hex): void;
    hexes: Hexes;
}

export interface BattleViewProps extends BattleUnitsProps {
    width: number;
    height: number;
    onHexClick(hex: Hex): void;
    hexes: Hexes;
}

export interface LineContainerProps {
    lineNumber: number;
    width: number;
}

export type BattleState = {
    Battle: {
        battleUnits: BattleUnit[];
        hexes: Hexes;
    };
};

export interface PreparedUnit extends BattleUnit, Unit {}

export interface Hex {
    x: number;
    y: number;
    isWithUnit: boolean;
    isHighlighted: boolean;
    isPassable: boolean;
    isEmpty?: boolean;
}

export interface Hexes {
    [coordinates: string]: Hex;
}

export interface Coord {
    x: number;
    y: number;
}
