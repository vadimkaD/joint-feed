import { Unit, UnitsState } from "../Units.types";

export const units = (state: UnitsState) => state.Player.Units.units as Unit[];
