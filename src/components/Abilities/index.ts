import { magicArrowAbility } from "./MagicArrow/MagicArrow";
import { moveAbility } from "./Move/Move";
import { ABILITIES } from "../../core/Abilities/Abilities.constants";
import { UIAbilities } from "./Abilities.types";

export const abilitiesDictionary: UIAbilities = {
    [ABILITIES.MOVE]: moveAbility,
    [ABILITIES.MAGIC_ARROW]: magicArrowAbility,
};
