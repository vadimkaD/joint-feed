import { BattleUnitsProps, HexesProps, UnitsOnBoard } from "../Battle/Battle.types";
import React from "react";
import { Action } from "../ActionQueue/ActionQueue.types";
import { Coord } from "../../hexagons/hexagons.types";

export interface BattlefieldProps extends BattleUnitsProps, HexesProps {
    playerActions: Action[];
    queue: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
    mouseLeaveBoard: () => void;
    isAnimation: boolean;
}

export interface BattlefieldLineProps extends HexesProps {
    lineNumber: number;
    unitsOnBoard: UnitsOnBoard;
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
