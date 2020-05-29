import { BattleUnitsState } from "../BattleUnits.types";
import { Unit } from "../../../core/Battle/Unit.types";

export const battleUnits = (state: BattleUnitsState): Unit[] => state.BattleUnits.battleUnits;
