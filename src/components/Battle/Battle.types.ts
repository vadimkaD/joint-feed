import { Hex, Hexes } from "../../core/Battle/Battle.types";
import { Unit } from "../../core/Battle/Unit.types";
import { Highlight } from "../Battlefield/Battlefield.constants";

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

export interface HightlightedHexes {
    [coordinates: string]: Highlight;
}
