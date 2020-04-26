import { Unit } from "./Units.types";
import { Archery } from "../../../core/abilities";

export const units: Unit[] = [
    {
        id: 1,
        maxHp: 25,
        currentHp: 25,
        damage: 7,
        abilities: [Archery.id],
        name: "Лучник",
        image: "/images/units/archer/archer.gif",
    },
];
