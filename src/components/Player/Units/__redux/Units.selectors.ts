import { UnitsState } from "../Units.types";
import { BaseUnit } from "../../../Unit/Unit.types";

export const units = (state: UnitsState) => state.Player.Units.units as BaseUnit[];
