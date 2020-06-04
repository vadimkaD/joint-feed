import { HightlightedHexes } from "../../Battle/Battle.types";
import { coordArrToObj, getStringFromCoord, isSameCoord } from "../../../core/Hexagons";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { GetHighlights } from "../Abilities.types";
import { abilities } from "../../../core/Abilities";

export const getHighlights: GetHighlights = (hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue) => {
    const highlights: HightlightedHexes = {};

    const coords = abilities.MAGIC_ARROW.getSelectionArea(selectedUnit, hexes, Object.values(unitsOnBoard), queue);
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
