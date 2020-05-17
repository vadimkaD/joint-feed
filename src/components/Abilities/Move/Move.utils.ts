import { HightlightedHexes } from "../../Battle/Battle.types";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { getStringFromCoord } from "../../../hexagons";
import { Coord } from "../../../hexagons/hexagons.types";

export function getHighlightsForRoute(route: Coord[]): HightlightedHexes {
    const highlights: HightlightedHexes = {};
    route.forEach((coord, index, arr) => {
        highlights[getStringFromCoord(coord)] = Highlight.MOVE;
    });
    return highlights;
}
