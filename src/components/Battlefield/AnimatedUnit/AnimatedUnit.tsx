import React, { useMemo, useState, useEffect } from "react";
import { UnitImage } from "../AnimatedUnits/AnimatedUnits.styled";
import { UNIT_SIZE } from "../Units/Units.constants";
import { getCenter } from "../Battlefield.utils";
import { AnimatedUnitProps } from "./AnimatedUnit.types";

const AnimatedUnit: React.FunctionComponent<AnimatedUnitProps> = ({ unit, transportAnimations }) => {
    const center = useMemo(() => getCenter(unit.coord.x, unit.coord.y), [unit]);
    const unitAnimations = useMemo(() => transportAnimations.filter(a => a.targetUnitId === unit.id), [
        unit,
        transportAnimations,
    ]);
    const [x, setX] = useState(center.x);
    const [y, setY] = useState(center.y);

    useEffect(() => {
        const lastAnim = unitAnimations.pop();
        if (lastAnim) {
            const center = getCenter(lastAnim.destination.x, lastAnim.destination.y);
            setX(center.x);
            setY(center.y);
        }
    }, [unit, unitAnimations]);

    return <UnitImage key={unit.id} xlinkHref={unit.image} x={x - UNIT_SIZE / 2} y={y - UNIT_SIZE / 2} />;
};

export default AnimatedUnit;
