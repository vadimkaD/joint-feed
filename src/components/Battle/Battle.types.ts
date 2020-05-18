import { Highlight } from "../Battlefield/Battlefield.constants";
import { Hex, Hexes } from "../Hexes/Hexes.types";
import { BattleUnit } from "../BattleUnits/BattleUnits.types";

export enum Owner {
    PLAYER = "PLAYER",
    ENEMY = "ENEMY",
}

export type BattleState = {
    Battle: {
        battleUnits: BattleUnit[];
        hexes: Hexes;
        hexUnderCursor: Hex;
        isAnimation: boolean;
        tickNumber: number;
        stepNumber: number;
    };
};

export interface UnitsOnBoard {
    [coordinates: string]: BattleUnit;
}

export interface HightlightedHexes {
    [coordinates: string]: Highlight;
}
