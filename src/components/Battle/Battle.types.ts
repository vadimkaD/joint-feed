import { Highlight } from "../Battlefield/Battlefield.constants";
import { Unit, Hex, Hexes } from "../../core/Battle/Battle.types";

export enum Owner {
    PLAYER = "PLAYER",
    ENEMY = "ENEMY",
}

export type BattleState = {
    Battle: {
        battleUnits: Unit[];
        hexes: Hexes;
        hexUnderCursor: Hex;
        isAnimation: boolean;
        tickNumber: number;
        stepNumber: number;
    };
};

export interface UnitsOnBoard {
    [coordinates: string]: Unit;
}

export interface HightlightedHexes {
    [coordinates: string]: Highlight;
}
