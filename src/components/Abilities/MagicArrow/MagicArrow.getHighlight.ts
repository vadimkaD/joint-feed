import { GetHighlights } from "../Abilities.types";
import { HightlightedHexes } from "../../Battle/Battle.types";
import { getEffectedUnit, getEffectsForSelectedUnit } from "../Abilities.utils";
import { CAST_RANGE } from "./MagicArrow.constants";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { coordArrToObj, getArea, getStringFromCoord, isSameCoord } from "../../../hexagons";

export const getHighlights: GetHighlights = (hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue) => {
    const highlights: HightlightedHexes = {};
    const effectsForSelectedUnit = getEffectsForSelectedUnit(queue, unitsOnBoard, selectedUnit);

    const updatedUnit = getEffectedUnit(effectsForSelectedUnit, selectedUnit);

    const coords = getArea(updatedUnit.coord, CAST_RANGE);
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
