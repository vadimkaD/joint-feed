import { createReducer } from "deox";
import { BattleUnit, Coord, Hex, Hexes } from "../Battle.types";
import * as actions from "./Battle.actions";
import { defaultHexes } from "../Battle.constants";
import { selectUnit } from "../../Unit/InfoPanel/__redux/InfoPanel.actions";
import { getAreaCoords, getStringFromCoord } from "../Battle.utils";
import { handleAction } from "redux-actions";

export const battleUnits = createReducer([] as BattleUnit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
    handleAction(actions.addUnit, (state, { payload }) => [...state, payload]),
]);

export const hexes = createReducer(defaultHexes as Hexes, handleAction => []);

export const hexUnderCursor = createReducer(null as Hex | null, handleAction => []);
