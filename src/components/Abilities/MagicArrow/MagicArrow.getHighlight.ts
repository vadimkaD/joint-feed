import { HightlightedHexes } from "../../Battle/Battle.types";
import { CAST_RANGE } from "./MagicArrow.constants";
import { coordArrToObj, getArea, getStringFromCoord, isSameCoord } from "../../../core/Hexagons";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { GetHighlights } from "../Abilities.types";

export const getHighlights: GetHighlights = (hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue) => {
    const highlights: HightlightedHexes = {};

    const coords = getArea(selectedUnit.coord, CAST_RANGE);
    const areaObj = coordArrToObj(coords);

    coords.reduce((total: HightlightedHexes, coord) => {
        const key = getStringFromCoord(coord);
        total[key] = Highlight.HOVER;
        if (isSameCoord(coord, selectedUnit.coord)) {
            total[key] = Highlight.SELECTED_UNIT;
        }
        return total;
    }, highlights);

    if (hexUnderCursor && areaObj[getStringFromCoord(hexUnderCursor.coord)]) {
        highlights[getStringFromCoord(hexUnderCursor.coord)] = Highlight.MAGIC_ARROW;
    }

    return highlights;
};
