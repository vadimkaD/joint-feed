import { BattleUnitsProps, Coord, HexesProps, UnitsOnBoard } from "../Battle/Battle.types";
import React from "react";

export interface BattlefieldProps extends BattleUnitsProps, HexesProps {}

export interface BattlefieldLineProps extends HexesProps {
    lineNumber: number;
    unitsOnBoard: UnitsOnBoard;
}

export enum Highlight {
    HOVER,
    ROUTE,
}

export interface CenterProps {
    center: Coord;
}

export interface PolygonProps {
    points: string;
}

export interface InteractivePolygonProps extends PolygonProps {
    onMouseEnter: (e: React.SyntheticEvent) => void;
    onClick: (e: React.SyntheticEvent) => void;
}
