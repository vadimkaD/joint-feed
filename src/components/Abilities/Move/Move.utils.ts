import { HightlightedHexes } from "../../Battle/Battle.types";
import { getStringFromCoord } from "../../../core/Hexagons";
import { Coord } from "../../../core/Battle/Hexagon.types";
import { Highlight } from "../../Battlefield/Battlefield.constants";

export function getHighlightsForRoute(route: Coord[]): HightlightedHexes {
    const highlights: HightlightedHexes = {};
    route.forEach((coord, index, arr) => {
        highlights[getStringFromCoord(coord)] = Highlight.MOVE;
    });
    return highlights;
}
