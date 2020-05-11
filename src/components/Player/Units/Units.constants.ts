import { ABILITIES } from "../../Abilities/Abilities.constants";
import { BaseUnit } from "../../Unit/Unit.types";

export const units: BaseUnit[] = [
    {
        id: "Elf",
        maxHp: 25,
        damage: 7,
        abilities: [ABILITIES.MOVE],
        name: "Лучник",
        image: "/images/units/sprites/Elf_Vampire.png",
    },
    {
        id: "Dwarf",
        maxHp: 25,
        damage: 7,
        abilities: [ABILITIES.MOVE],
        name: "Воин с топором",
        image: "/images/units/sprites/Dwarf_Ruler.png",
    },
];
