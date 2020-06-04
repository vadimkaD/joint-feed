import { ActionsByUnits } from "../Battlefield/StepAnimations/StepAnimations.types";
import { ACTION_POINTS } from "../../core/Battle/Battle.constants";
import { Action } from "../../core/Actions/Actions.types";

export function getTickActions(actionsByUnits: ActionsByUnits): Action[][] {
    const allActions = Object.values(actionsByUnits);
    const stepActionArray: Action[][] = [];
    for (const actions of allActions) {
        for (let i = 0; i < ACTION_POINTS; i++) {
            const action = actions[i];
            if (action) {
                stepActionArray[i] ? stepActionArray[i].push(action) : (stepActionArray[i] = [action]);
            }
        }
    }
    return stepActionArray;
}
