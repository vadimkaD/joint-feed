import { Ability, AbilityType, Target } from "../Abilities.types";
import { ABILITIES } from "../Abilities.constants";
import MagicArrowIcon from "./MagicArrow.icon";
import { getHighlights } from "./MagicArrow.getHighlight";
import { CAST_RANGE, CAST_TIME } from "./MagicArrow.constants";
import { onHexClick } from "./__redux/MagicArrow.actions";
import MagicArrowOutline from "./MagicArrow.outline";

export const magicArrowAbility: Ability = {
    id: ABILITIES.MAGIC_ARROW,
    castType: AbilityType.CAST,
    castTime: CAST_TIME,
    castRange: CAST_RANGE,
    delay: 2,
    target: Target.AREA,
    iconComponent: MagicArrowIcon,
    getHighlights: getHighlights,
    onHexClick: onHexClick,
    actionOutline: MagicArrowOutline,
    effector: () => [],
    abilityAnimator: () => null,
};
