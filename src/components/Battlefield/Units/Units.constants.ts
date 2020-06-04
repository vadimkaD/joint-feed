import DwarfRuler from "./images/Dwarf_Ruler.png";
import ElfVampire from "./images/Elf_Vampire.png";
import Imp from "./images/Imp.png";
import Skull from "./images/skull.png";
import { UnitsImages } from "./Units.types";

export enum FORM_FACTORS {
    IMP = "IMP",
    DWARF_RULER = "DWARF_RULER",
    ELF_VAMPIRE = "ELF_VAMPIRE",
    DEAD = "DEAD",
}
export const UNIT_SIZE = 72;

export const UNIT_IMAGES: UnitsImages = {
    [FORM_FACTORS.IMP]: Imp,
    [FORM_FACTORS.DWARF_RULER]: DwarfRuler,
    [FORM_FACTORS.ELF_VAMPIRE]: ElfVampire,
    [FORM_FACTORS.DEAD]: Skull,
};
