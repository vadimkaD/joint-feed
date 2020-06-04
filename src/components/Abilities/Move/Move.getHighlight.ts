import { HightlightedHexes } from "../../Battle/Battle.types";
import {
    coordArrToObj,
    getAsObstacles,
    getPathWithObstacles,
    getStringFromCoord,
    isSameCoord,
} from "../../../core/Hexagons";
import { getHighlightsForRoute } from "./Move.utils";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { GetHighlights } from "../Abilities.types";
import { abilities, getUnitUpdatedByTransportPrediction } from "../../../core/Abilities";
import { Obstacles } from "../../../core/Hexagons/hexagons.types";

export const getHighlights: GetHighlights = (hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue) => {
    const highlights: HightlightedHexes = {};

    const obstacles: Obstacles = getAsObstacles({ hexes, units: Object.values(unitsOnBoard) });

    const coords = abilities.MOVE.getSelectionArea(selectedUnit, hexes, Object.values(unitsOnBoard), queue);
    const areaObj = coordArrToObj(coords);

    if (
        hexUnderCursor &&
        !unitsOnBoard[getStringFromCoord(hexUnderCursor.coord)] &&
        areaObj[getStringFromCoord(hexUnderCursor.coord)]
    ) {
        const updUnit = getUnitUpdatedByTransportPrediction(selectedUnit, queue);

        const route = getPathWithObstacles(updUnit.coord, hexUnderCursor.coord, hexes, obstacles);
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
