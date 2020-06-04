import { Owner } from "../../core/Battle/Unit.types";

export interface PlayerState {
    Player: {
        owner: Owner | null;
    };
}
