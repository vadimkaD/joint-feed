import { Action } from "../../core/Actions/Actions.types";

export interface ActionQueueState {
    ActionQueue: {
        queue: Action[];
    };
}
