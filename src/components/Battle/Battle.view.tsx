import React from "react";
import { BattleViewProps } from "./Battle.types";
import { BattleViewWrapper, CenterWrapper } from "./Battle.styled";
import InfoPanel from "../Unit/InfoPanel/InfoPanel";
import { HEIGHT_ARRAY, WIDTH } from "./Battle.constants";
import { BattleLine } from "./BattleLine";

function BattleView(props: BattleViewProps) {
    const { highlightedHexes, hexes, onHexClick, onMouseEnterHex, unitsOnBoard } = props;

    return (
        <CenterWrapper>
            <BattleViewWrapper width={WIDTH}>
                {HEIGHT_ARRAY.map(i => (
                    <BattleLine
                        key={i}
                        onMouseEnterHex={onMouseEnterHex}
                        hexes={hexes}
                        lineNumber={i}
                        highlightedHexes={highlightedHexes}
                        unitsOnBoard={unitsOnBoard}
                        onHexClick={onHexClick}
                    />
                ))}
            </BattleViewWrapper>
            <InfoPanel />
        </CenterWrapper>
    );
}

export default BattleView;
export { BattleView };
