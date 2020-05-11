import { AbilityKeys } from "../Abilities/Abilities.types";

export interface BaseUnit {
    id: string;
    maxHp: number;
    abilities: AbilityKeys[];
    name: string;
    damage: number;
    image: string;
}
