import { Highlight } from "../Battlefield/Battlefield.constants";
import { Action } from "../ActionQueue/ActionQueue.types";
import { Hex, Hexes } from "../Hexes/Hexes.types";
import { BattleUnit } from "../BattleUnits/BattleUnits.types";

export enum Owner {
    PLAYER = "PLAYER",
    ENEMY = "ENEMY",
}

export interface BattleUnitsProps {
    battleUnits: BattleUnit[];
    unitsOnBoard: UnitsOnBoard;
}

export interface HexesProps {
    onHexClick(hex: Hex): void;
    onMouseEnterHex(hex: Hex): void;
    hexes: Hexes;
    highlightedHexes: HightlightedHexes;
}

export interface BattleProps extends BattleUnitsProps, HexesProps {
    selectUnit(unitId: string | null): void;
    addUnit(unit: BattleUnit): void;
    playerActions: Action[];
    queue: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
    mouseLeaveBoard: () => void;
    isAnimation: boolean;
}

export interface BattleViewProps extends BattleUnitsProps, HexesProps {
    playerActions: Action[];
    queue: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
    mouseLeaveBoard: () => void;
    isAnimation: boolean;
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
