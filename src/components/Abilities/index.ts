import { Abilities } from "./Abilities.types";
import { moveAbility } from "./Move/Move.constants";
import { ABILITIES } from "./Abilities.constants";
import { magicArrowAbility } from "./MagicArrow/MagicArrow";

export const abilitiesDictionary: Abilities = {
    [ABILITIES.MOVE]: moveAbility,
    [ABILITIES.MAGIC_ARROW]: magicArrowAbility,
};
