import React from "react";
import { AbilityActionOutline } from "../Abilities.types";
import { getCenter, getHexCoords, getPointsFromCoords } from "../../Battlefield/Battlefield.utils";
import { HEX_SIZE } from "../../Battlefield/Battlefield.constants";
import { OutlinePolygon } from "../Abilities.styled";
import { MagicArrow } from "./MagicArrow.highlight";
import { Coord } from "../../../core/Battle/Hexagon.types";

const MagicArrowOutline: AbilityActionOutline = ({ action, playerUnitsOnBoard, isLastInChain }) => {
    const target: Coord = action.target[0].coord;
    if (target) {
        const center = getCenter(target.x, target.y);
        const points = getPointsFromCoords(getHexCoords(center, HEX_SIZE));

        return (
            <>
                <MagicArrow center={center} />
                <OutlinePolygon points={points} />
            </>
        );
    }

    return null;
};

export default MagicArrowOutline;
