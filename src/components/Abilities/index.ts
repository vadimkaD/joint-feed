import { Abilities } from "./Abilities.types";
import { ABILITIES } from "./Abilities.constants";
import { magicArrowAbility } from "./MagicArrow/MagicArrow";
import { moveAbility } from "./Move/Move";

export const abilitiesDictionary: Abilities = {
    [ABILITIES.MOVE]: moveAbility,
    [ABILITIES.MAGIC_ARROW]: magicArrowAbility,
};
