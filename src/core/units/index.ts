import { Archery } from "../abilities";

export interface Unit {
    id: number;
    hp: number;
    damage: number;
    abilities: number[];
    name: string;
    image: string;
}

export const Archer: Unit = {
    id: 1,
    hp: 25,
    damage: 7,
    abilities: [Archery.id],
    name: "Лучник",
    image: "/images/units/archer/archer.gif",
};

export default {
    [Archer.id]: Archer,
};
