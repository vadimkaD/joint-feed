import { ActionQueueState } from "../ActionQueue.types";
import { Action } from "../../../core/Actions/Actions.types";

export const queue = (state: ActionQueueState) => state.ActionQueue.queue as Action[];
