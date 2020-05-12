import { Ability, AbilityType, Target } from "../Abilities.types";
import { ABILITIES } from "../Abilities.constants";
import MoveIcon from "./Move.icon";
import { getHighlights } from "./Move.getHighlight";
import { handleEffect, onHexClick } from "./__redux/Move.actions";
import MoveOutline from "./Move.outline";
import { moveEffector } from "./Move.effector";
import MoveAnimator from "./Move.animator";
import { EffectType } from "../../Effects/Effects.types";
import { CAST_RANGE, CAST_TIME, DELAY } from "./Move.constants";

export const moveAbility: Ability = {
    id: ABILITIES.MOVE,
    castType: AbilityType.CAST,
    castTime: CAST_TIME,
    castRange: CAST_RANGE,
    delay: DELAY,
    target: Target.AREA,
    iconComponent: MoveIcon,
    getHighlights: getHighlights,
    onHexClick: onHexClick,
    actionOutline: MoveOutline,
    effector: moveEffector,
    abilityAnimator: MoveAnimator,
    effectType: EffectType.TRANSPORT,
    handleEffect: handleEffect,
};
