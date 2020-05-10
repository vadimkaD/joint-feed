import { Ability, AbilityType, Target } from "../Abilities.types";
import { ABILITIES } from "../Abilities.constants";
import MoveIcon from "./Move.icon";
import { getHighlights } from "./Move.getHighlight";
import { onHexClick } from "./__redux/Move.actions";
import MoveOutline from "./Move.outline";
import { moveEffector } from "./Move.effector";
import MoveAnimator from "./Move.animator";

export const moveAbility: Ability = {
    id: ABILITIES.MOVE,
    castType: AbilityType.CAST,
    castTime: 1,
    castRange: 1,
    delay: 0,
    target: Target.AREA,
    iconComponent: MoveIcon,
    getHighlights: getHighlights,
    onHexClick: onHexClick,
    actionOutline: MoveOutline,
    effector: moveEffector,
    abilityAnimator: MoveAnimator,
};

export const ICON_PATH = "/images/abilities/move/move.png";
