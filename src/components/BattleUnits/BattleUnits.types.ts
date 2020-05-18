import { Coord } from "../../hexagons/hexagons.types";
import { ABILITIES } from "../Abilities/Abilities.constants";

export enum Owner {
    PLAYER = "PLAYER",
    ENEMY = "ENEMY",
}

export interface BattleUnit {
    coord: Coord;
    id: string;
    owner: Owner;
    name: string;
    damage: number;
    image: string;
    maxHp: number;
    currentHp: number;
    currentActionPoints: number;
    abilities: ABILITIES[];
}

export type BattleUnitsState = {
    BattleUnits: {
        battleUnits: BattleUnit[];
    };
};
