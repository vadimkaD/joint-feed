import { Abilities } from "./Abilities.types";
import { Move } from "./abilities/Move/Move";
import { ABILITIES } from "./Abilities.constants";

export const abilities: Abilities = {
    [ABILITIES.MOVE]: Move,
    [ABILITIES.MAGIC_ARROW]: Move,
};
