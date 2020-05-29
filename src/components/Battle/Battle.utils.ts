import { abilitiesDictionary } from "../Abilities";
import { getStringFromCoord } from "../../core/Hexagons";
import { EffectType, Hex, Hexes } from "../../core/Battle/Battle.types";
import { Action } from "../../core/Actions/Actions.types";

export function hexArrToObj(hexes: Hex[]): Hexes {
    return hexes.reduce((total: Hexes, hex) => {
        total[getStringFromCoord(hex.coord)] = hex;
        return total;
    }, {});
}
