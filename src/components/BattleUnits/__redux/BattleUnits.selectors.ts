import { BattleUnit, BattleUnitsState } from "../BattleUnits.types";

export const battleUnits = (state: BattleUnitsState): BattleUnit[] => state.BattleUnits.battleUnits;
