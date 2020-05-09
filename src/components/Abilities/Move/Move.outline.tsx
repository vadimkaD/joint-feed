import React from "react";
import { AbilityActionOutline } from "../Abilities.types";
import { getCenter, getHexCoords, getPointsFromCoords } from "../../Battlefield/Battlefield.utils";
import { Coord, PreparedUnit } from "../../Battle/Battle.types";
import { OutlinePolygon } from "./Move.styled";
import { HEX_SIZE } from "../../Battlefield/Battlefield.constants";
import { Move } from "./Move.highlight";
import { UNIT_SIZE } from "../../Battlefield/Units/Units.constants";
import { UnitImage } from "../../Battlefield/Units/Units.styled";

const MoveOutline: AbilityActionOutline = ({ action, playerUnitsOnBoard, isLastInChain }) => {
    const target = action.target as Coord;
    const center = getCenter(target.x, target.y);
    const points = getPointsFromCoords(getHexCoords(center, HEX_SIZE));
    const unit = Object.values(playerUnitsOnBoard).find(unit => unit.id === action.unitId) as PreparedUnit | undefined;
    let renderUnit;
    if (unit) {
        renderUnit = <UnitImage xlinkHref={unit.image} x={center.x - UNIT_SIZE / 2} y={center.y - UNIT_SIZE / 2} />;
    }
    return (
        <>
            <Move center={center} />
            {isLastInChain && renderUnit}
            <OutlinePolygon points={points} />
        </>
    );
};

export default MoveOutline;
