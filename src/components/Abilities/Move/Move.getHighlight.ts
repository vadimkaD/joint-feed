import { HightlightedHexes } from "../../Battle/Battle.types";
import { GetHighlights } from "../Abilities.types";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { getEffectedUnit, getEffectsForSelectedUnit } from "../Abilities.utils";
import {
    coordArrToObj,
    getAreaWithObstacles,
    getPathWithObstacles,
    getStringFromCoord,
    isSameCoord,
} from "../../../core/Hexagons";
import { getHighlightsForRoute } from "./Move.utils";

export const getHighlights: GetHighlights = (hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue) => {
    const highlights: HightlightedHexes = {};

    const effectsForSelectedUnit = getEffectsForSelectedUnit(queue, unitsOnBoard, selectedUnit);

    const updatedUnit = getEffectedUnit(effectsForSelectedUnit, selectedUnit);

    const coords = getAreaWithObstacles(updatedUnit.coord, updatedUnit.currentActionPoints, hexes, unitsOnBoard);
    const areaObj = coordArrToObj(coords);

    if (
        hexUnderCursor &&
        !unitsOnBoard[getStringFromCoord(hexUnderCursor.coord)] &&
        areaObj[getStringFromCoord(hexUnderCursor.coord)]
    ) {
        const route = getPathWithObstacles(updatedUnit.coord, hexUnderCursor.coord, hexes, unitsOnBoard);
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
