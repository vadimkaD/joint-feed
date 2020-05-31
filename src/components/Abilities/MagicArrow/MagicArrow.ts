import MagicArrowIcon from "./MagicArrow.icon";
import { getHighlights } from "./MagicArrow.getHighlight";
import { handleEffect, onHexClick } from "./__redux/MagicArrow.actions";
import MagicArrowOutline from "./MagicArrow.outline";
import MagicArrowAnimator from "./animator/MagicArrow.animator";
import { ABILITIES } from "../../../core/Battle/Abilities.constants";
import { UIAbility } from "../Abilities.types";

export const magicArrowAbility: UIAbility = {
    ability: ABILITIES.MAGIC_ARROW,
    iconComponent: MagicArrowIcon,
    getHighlights: getHighlights,
    onHexClick: onHexClick,
    actionOutline: MagicArrowOutline,
    abilityAnimator: MagicArrowAnimator,
    handleEffect: handleEffect,
};
