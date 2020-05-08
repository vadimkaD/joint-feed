import { Action, ActionQueueState } from "../ActionQueue.types";

export const queue = (state: ActionQueueState) => state.ActionQueue.queue as Action[];
