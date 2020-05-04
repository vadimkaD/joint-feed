import React, { FunctionComponent } from "react";
import { UnitsOnBoard } from "../../Battle/Battle.types";
import { getCenter } from "../Battlefield.utils";
import { UnitImage } from "./Units.styled";
import { UNIT_SIZE } from "./Units.constants";

interface UnitsProps {
    unitsOnBoard: UnitsOnBoard;
}

const Units: FunctionComponent<UnitsProps> = ({ unitsOnBoard }) => {
    const coords: string[] = Object.keys(unitsOnBoard);
    return (
        <>
            {coords.map((key, i) => {
                const unit = unitsOnBoard[key];
                const center = getCenter(unit.coord.x, unit.coord.y);
                return (
                    <UnitImage
                        key={i}
                        xlinkHref={unit.image}
                        x={center.x - UNIT_SIZE / 2}
                        y={center.y - UNIT_SIZE / 2}
                    />
                );
            })}
        </>
    );
};

export default Units;
