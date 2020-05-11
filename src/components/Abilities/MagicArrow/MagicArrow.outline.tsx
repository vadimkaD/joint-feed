import React from "react";
import { AbilityActionOutline } from "../Abilities.types";
import { getCenter, getHexCoords, getPointsFromCoords } from "../../Battlefield/Battlefield.utils";
import { Coord } from "../../Battle/Battle.types";
import { HEX_SIZE } from "../../Battlefield/Battlefield.constants";
import { OutlinePolygon } from "../Abilities.styled";
import { MagicArrow } from "./MagicArrow.highlight";

const MagicArrowOutline: AbilityActionOutline = ({ action, playerUnitsOnBoard, isLastInChain }) => {
    const target = action.target as Coord;
    const center = getCenter(target.x, target.y);
    const points = getPointsFromCoords(getHexCoords(center, HEX_SIZE));

    return (
        <>
            <MagicArrow center={center} />
            <OutlinePolygon points={points} />
        </>
    );
};

export default MagicArrowOutline;
