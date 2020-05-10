import React from "react";
import { BATTLEFIELD_HEIGHT, BATTLEFIELD_WIDTH, HEIGHT_ARRAY } from "./Battlefield.constants";
import BattlefieldLine from "./BattlefieldLine";
import { BattlefieldProps } from "./Battlefield.types";
import Units from "./Units/Units";
import ActionOutlines from "./ActionOutlines/ActionOutlines";
import StepAnimations from "./StepAnimations/StepAnimations";

function Battlefield(props: BattlefieldProps) {
    const {
        highlightedHexes,
        hexes,
        onHexClick,
        onMouseEnterHex,
        unitsOnBoard,
        playerActions,
        playerUnitsOnBoard,
        mouseLeaveBoard,
        isAnimation,
    } = props;

    return (
        <svg
            version="1.1"
            baseProfile="full"
            width={BATTLEFIELD_WIDTH}
            height={BATTLEFIELD_HEIGHT}
            xmlns="http://www.w3.org/2000/svg"
            onMouseLeave={mouseLeaveBoard}
        >
            {HEIGHT_ARRAY.map((i, j) => (
                <BattlefieldLine
                    hexes={hexes}
                    onMouseEnterHex={onMouseEnterHex}
                    onHexClick={onHexClick}
                    unitsOnBoard={unitsOnBoard}
                    highlightedHexes={highlightedHexes}
                    key={i}
                    lineNumber={j}
                />
            ))}
            {isAnimation ? null : <Units unitsOnBoard={unitsOnBoard} />}
            {isAnimation ? null : (
                <ActionOutlines playerActions={playerActions} playerUnitsOnBoard={playerUnitsOnBoard} />
            )}
            <StepAnimations />
        </svg>
    );
}

export default Battlefield;
