import { AbilityKeys } from "../../Abilities/Abilities.types";

export interface Unit {
    id: number;
    currentHp: number;
    maxHp: number;
    abilities: AbilityKeys[];
    name: string;
    damage: number;
    image: string;
}

export interface UnitsState {
    Player: {
        Units: {
            units: Unit[];
        };
    };
}
