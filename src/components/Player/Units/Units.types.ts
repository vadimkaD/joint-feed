import { BaseUnit } from "../../Unit/Unit.types";

export interface UnitsState {
    Player: {
        Units: {
            units: BaseUnit[];
        };
    };
}
