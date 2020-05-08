import { HightlightedHexes, PreparedUnit } from "../../Battle/Battle.types";
import { GetHighlights } from "../Abilities.types";
import {
    coordArrToObj,
    getAreaCoords,
    getHighlightsForRoute,
    getRoute,
    getStringFromCoord,
    isSameCoord,
} from "../../Battle/Battle.utils";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { abilitiesDictionary } from "../index";

export const getHighlights: GetHighlights = (hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue) => {
    const highlights: HightlightedHexes = {};

    const effectsForSelectedUnit = queue
        .map(action => {
            const ability = abilitiesDictionary[action.ability];
            return ability.effector(action, unitsOnBoard);
        })
        .flat()
        .filter(effect => effect.id === selectedUnit.id);

    const updatedUnit = effectsForSelectedUnit.reduce(
        (total, effect) => {
            Object.assign(total, effect);
            return total;
        },
        { ...selectedUnit },
    ) as PreparedUnit;

    const coords = getAreaCoords(updatedUnit.currentActionPoints, updatedUnit.coord);
    const areaObj = coordArrToObj(coords);

    if (
        hexUnderCursor &&
        !unitsOnBoard[getStringFromCoord(hexUnderCursor.coord)] &&
        areaObj[getStringFromCoord(hexUnderCursor.coord)]
    ) {
        const route = getRoute(updatedUnit.coord, hexUnderCursor.coord);
        Object.assign(highlights, getHighlightsForRoute(route));
    }

    coords.reduce((total: HightlightedHexes, coord) => {
        const key = getStringFromCoord(coord);
        total[key] = highlights[key] !== undefined ? highlights[key] : Highlight.HOVER;
        if (isSameCoord(coord, selectedUnit.coord)) {
            total[key] = Highlight.SELECTED_UNIT;
        }
        return total;
    }, highlights);

    return highlights;
};
