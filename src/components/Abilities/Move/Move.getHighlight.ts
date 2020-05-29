import { HightlightedHexes } from "../../Battle/Battle.types";
import {
    coordArrToObj,
    getAreaWithObstacles,
    getPathWithObstacles,
    getStringFromCoord,
    isSameCoord,
} from "../../../core/Hexagons";
import { getHighlightsForRoute } from "./Move.utils";
import { Obstacles } from "../../../core/Hexagons/hexagons.types";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { GetHighlights } from "../Abilities.types";

export const getHighlights: GetHighlights = (hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue) => {
    const highlights: HightlightedHexes = {};

    const obstacles: Obstacles = Object.keys(unitsOnBoard).reduce((obj, key) => {
        obj[key] = true;
        return obj;
    }, {} as Obstacles);

    const coords = getAreaWithObstacles(selectedUnit.coord, selectedUnit.currentActionPoints, hexes, obstacles);
    const areaObj = coordArrToObj(coords);

    if (
        hexUnderCursor &&
        !unitsOnBoard[getStringFromCoord(hexUnderCursor.coord)] &&
        areaObj[getStringFromCoord(hexUnderCursor.coord)]
    ) {
        const route = getPathWithObstacles(selectedUnit.coord, hexUnderCursor.coord, hexes, obstacles);
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
