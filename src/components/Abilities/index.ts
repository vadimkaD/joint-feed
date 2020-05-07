import { Abilities } from "./Abilities.types";
import { moveAbility } from "./Move/Move.constants";
import { ABILITIES } from "./Abilities.constants";

export const abilitiesDictionary: Abilities = {
    [ABILITIES.MOVE]: moveAbility,
};
