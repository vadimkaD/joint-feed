import { BattleState, Unit } from "../Battle.types";

export const units = (state: BattleState) => state.Battle.units as Unit[];
