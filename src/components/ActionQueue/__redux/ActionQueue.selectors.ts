import { createSelector } from "reselect";
import { Action, ActionQueueState } from "../ActionQueue.types";
import { playerUnitsOnBoard } from "../../Battle/__redux/Battle.selectors";
import { UnitsOnBoard } from "../../Battle/Battle.types";
import { queue } from "./ActionQueue.external-selectors";
import { BattleUnitsState } from "../../BattleUnits/BattleUnits.types";

export const playerActions = createSelector<ActionQueueState & BattleUnitsState, Action[], UnitsOnBoard, Action[]>(
    queue,
    playerUnitsOnBoard,
    (queue, playerUnitsOnBoard) => {
        const unitIds = Object.values(playerUnitsOnBoard).map(unit => unit.id);
        return queue.filter(action => unitIds.includes(action.unitId));
    },
);

export const unitActions = (unitId: string) =>
    createSelector<ActionQueueState & BattleUnitsState, Action[], Action[]>(playerActions, actions => {
        return actions.filter(action => action.unitId === unitId);
    });
