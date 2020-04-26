import { createReducer } from "deox";
import { BattleUnit, Coord, Hexes } from "../Battle.types";
import * as actions from "./Battle.actions";
import { defaultHexes } from "../Battle.constants";
import { selectUnit } from "../../Unit/InfoPanel/__redux/InfoPanel.actions";
import { getAreaCoords, getStringFromCoord } from "../Battle.utils";

export const battleUnits = createReducer([] as BattleUnit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
    handleAction(actions.addUnit, (state, { payload }) => [...state, payload]),
]);

export const hexes = createReducer(defaultHexes as Hexes, handleAction => [
    handleAction(selectUnit, (state, { payload }) => {
        if (payload === null) {
            return defaultHexes;
        }

        try {
            const newHexes: Hexes = { ...state };
            const area = getAreaCoords(payload!.currentActionPoints, payload as Coord).map(coord =>
                getStringFromCoord(coord),
            );
            area.forEach(coord => {
                newHexes[coord] = { ...newHexes[coord], isHighlighted: true };
            });
            return newHexes;
        } catch (e) {
            return state;
        }
    }),
]);
