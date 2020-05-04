import { Unit } from "./Units.types";
import { Archery } from "../../../core/abilities";

export const units: Unit[] = [
    {
        id: 1,
        maxHp: 25,
        currentHp: 10,
        damage: 7,
        abilities: [Archery.id],
        name: "Лучник",
        image: "/images/units/sprites/Elf_Vampire.png",
    },
    {
        id: 2,
        maxHp: 25,
        currentHp: 25,
        damage: 7,
        abilities: [Archery.id],
        name: "Воин с топором",
        image: "/images/units/sprites/Dwarf_Ruler.png",
    },
];
