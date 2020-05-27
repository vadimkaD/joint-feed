import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { UnitsOnBoard } from "../../Battle/Battle.types";
import { getCenter } from "../Battlefield.utils";
import { UnitImage } from "./Units.styled";
import { FORM_FACTORS, UNIT_IMAGES, UNIT_SIZE } from "./Units.constants";
import { unitsOnBoard as unitsOnBoardSelector } from "../../Battle/__redux/Battle.selectors";

const Units: FunctionComponent<{}> = props => {
    const unitsOnBoard: UnitsOnBoard = useSelector(unitsOnBoardSelector);

    const coords: string[] = Object.keys(unitsOnBoard);
    return (
        <>
            {coords.map((key, i) => {
                const unit = unitsOnBoard[key];
                const center = getCenter(unit.coord.x, unit.coord.y);
                return (
                    <UnitImage
                        key={i}
                        xlinkHref={UNIT_IMAGES[unit.formFactor as FORM_FACTORS]}
                        x={center.x - UNIT_SIZE / 2}
                        y={center.y - UNIT_SIZE / 2}
                    />
                );
            })}
        </>
    );
};

export default Units;
