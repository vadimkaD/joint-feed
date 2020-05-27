import React from "react";
import { AbilityActionOutline } from "../Abilities.types";
import { getCenter, getHexCoords, getPointsFromCoords } from "../../Battlefield/Battlefield.utils";
import { HEX_SIZE } from "../../Battlefield/Battlefield.constants";
import { Move } from "./Move.highlight";
import { FORM_FACTORS, UNIT_IMAGES, UNIT_SIZE } from "../../Battlefield/Units/Units.constants";
import { UnitImage } from "../../Battlefield/Units/Units.styled";
import { OutlinePolygon } from "../Abilities.styled";
import { Coord } from "../../../core/Hexagons/hexagons.types";
import { Unit } from "../../../core/Battle/Battle.types";

const MoveOutline: AbilityActionOutline = ({ action, playerUnitsOnBoard, isLastInChain }) => {
    const target = action.target[0] as Coord | undefined;
    if (target) {
        const center = getCenter(target.x, target.y);
        const points = getPointsFromCoords(getHexCoords(center, HEX_SIZE));
        const unit = Object.values(playerUnitsOnBoard).find(unit => unit.id === action.unitId) as Unit | undefined;
        let renderUnit;
        if (unit) {
            renderUnit = (
                <UnitImage
                    xlinkHref={UNIT_IMAGES[unit.formFactor as FORM_FACTORS]}
                    x={center.x - UNIT_SIZE / 2}
                    y={center.y - UNIT_SIZE / 2}
                />
            );
        }
        return (
            <>
                <Move center={center} />
                {isLastInChain && renderUnit}
                <OutlinePolygon points={points} />
            </>
        );
    }

    return null;
};

export default MoveOutline;
