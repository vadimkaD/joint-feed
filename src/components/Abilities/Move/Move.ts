import MoveIcon from "./Move.icon";
import { getHighlights } from "./Move.getHighlight";
import { handleEffect, onHexClick } from "./__redux/Move.actions";
import MoveOutline from "./Move.outline";
import MoveAnimator from "./animator/Move.animator";
import { ABILITIES } from "../../../core/Abilities/Abilities.constants";
import { UIAbility } from "../Abilities.types";

export const moveAbility: UIAbility = {
    ability: ABILITIES.MOVE,
    iconComponent: MoveIcon,
    getHighlights: getHighlights,
    onHexClick: onHexClick,
    actionOutline: MoveOutline,
    abilityAnimator: MoveAnimator,
    handleEffect: handleEffect,
};
