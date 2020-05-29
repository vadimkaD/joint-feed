import { Ability, AbilityType, Target } from "../../Abilities.types";
import { CAST_RANGE, CAST_TIME, DELAY } from "./Move.constants";
import { Hexes } from "../../../Battle/Battle.types";
import { ABILITIES } from "../../Abilities.constants";
import { Unit } from "../../../Battle/Unit.types";
import { Action, ActionTarget } from "../../../Actions/Actions.types";

export const Move: Ability = {
    getAction: function(p1: ActionTarget): Action {
        return {
            unitId: "2",
            actionId: "123",
            tickStart: 1,
            target: [],
            ability: ABILITIES.MOVE,
        };
    },
    getEffect: function(p1: Action, p2: Unit[], p3: Hexes, tick: number) {
        return null;
    },
    getSelectionArea: function(p1: Unit, p2: Hexes, p3: Unit[], queue: Action[]) {
        return [];
    },
    castRange: CAST_RANGE,
    castTime: CAST_TIME,
    castType: AbilityType.CAST,
    delay: DELAY,
    id: ABILITIES.MOVE,
    target: Target.AREA,
};
