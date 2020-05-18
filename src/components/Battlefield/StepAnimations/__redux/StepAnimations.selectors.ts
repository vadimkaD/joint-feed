import { createSelector } from "reselect";
import { queue } from "../../../ActionQueue/__redux/ActionQueue.external-selectors";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { Action, ActionQueueState } from "../../../ActionQueue/ActionQueue.types";
import { UnitsOnBoard } from "../../../Battle/Battle.types";
import { ActionsByUnits } from "../StepAnimations.types";
import { BattleUnitsState } from "../../../BattleUnits/BattleUnits.types";

export const actionsByUnits = createSelector<
    ActionQueueState & BattleUnitsState,
    Action[],
    UnitsOnBoard,
    ActionsByUnits
>(queue, unitsOnBoard, (queue, unitsOnBoard) => {
    const ids = Object.values(unitsOnBoard).map(unit => unit.id);
    return ids.reduce((total: ActionsByUnits, id) => {
        total[id] = queue.filter(action => action.unitId === id);
        return total;
    }, {});
});
