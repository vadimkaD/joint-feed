import { Ability, AbilityType, Target } from "../Abilities.types";
import { ABILITIES } from "../Abilities.constants";
import MagicArrowIcon from "./MagicArrow.icon";
import { getHighlights } from "./MagicArrow.getHighlight";
import { CAST_RANGE, CAST_TIME, DELAY } from "./MagicArrow.constants";
import { handleEffect, onHexClick } from "./__redux/MagicArrow.actions";
import MagicArrowOutline from "./MagicArrow.outline";
import { EffectType } from "../../Effects/Effects.types";
import MagicArrowAnimator from "./MagicArrow.animator";

export const magicArrowAbility: Ability = {
    id: ABILITIES.MAGIC_ARROW,
    castType: AbilityType.CAST,
    castTime: CAST_TIME,
    castRange: CAST_RANGE,
    delay: DELAY,
    target: Target.AREA,
    iconComponent: MagicArrowIcon,
    getHighlights: getHighlights,
    onHexClick: onHexClick,
    actionOutline: MagicArrowOutline,
    effector: () => [],
    abilityAnimator: MagicArrowAnimator,
    effectType: EffectType.DAMAGE_AND_FIELD_EFFECT,
    handleEffect: handleEffect,
};
