import React from "react";
import { Coord } from "../../core/Hexagons/hexagons.types";

export interface BattlefieldLineProps {
    lineNumber: number;
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
