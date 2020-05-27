import { BattleUnitsState } from "../BattleUnits.types";
import { Unit } from "../../../core/Battle/Battle.types";

export const battleUnits = (state: BattleUnitsState): Unit[] => state.BattleUnits.battleUnits;
