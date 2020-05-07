import { Ability, AbilityType, Target } from "../Abilities.types";
import { ABILITIES } from "../Abilities.constants";
import MoveIcon from "./Move.icon";
import { getHighlights } from "./Move.highlight";
import { onHexClick } from "./__redux/Move.actions";

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
};
