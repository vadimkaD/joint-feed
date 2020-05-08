import { createSelector } from "reselect";
import { Action, ActionQueueState } from "../ActionQueue.types";
import { playerUnitsOnBoard } from "../../Battle/__redux/Battle.selectors";
import { BattleState, UnitsOnBoard } from "../../Battle/Battle.types";
import { UnitsState } from "../../Player/Units/Units.types";

export const queue = (state: ActionQueueState) => state.ActionQueue.queue;
export const playerActions = createSelector<
    ActionQueueState & BattleState & UnitsState,
    Action[],
    UnitsOnBoard,
    Action[]
>(queue, playerUnitsOnBoard, (queue, playerUnitsOnBoard) => {
    const unitIds = Object.values(playerUnitsOnBoard).map(unit => unit.id);
    return queue.filter(action => unitIds.includes(action.unitId));
});
