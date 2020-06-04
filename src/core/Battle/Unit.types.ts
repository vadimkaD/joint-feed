import { Coord } from "./Hexagon.types";
import { ABILITIES } from "./Abilities.constants";

export interface Unit {
    coord: Coord;
    id: string;
    owner: Owner;
    name: string;
    damage: number;
    maxHp: number;
    currentHp: number;
    currentActionPoints: number;
    abilities: ABILITIES[];
    formFactor: string;
    isDead: boolean;
}

export enum Owner {
    RED = "RED",
    GREEN = "GREEN",
}

export interface UnitsOnBoard {
    [coordinates: string]: Unit;
}
