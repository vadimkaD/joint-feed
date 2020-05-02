import React from "react";
import { Hex as HexType, BattleLineProps } from "./Battle.types";
import { Hex, LabelWrap, LineContainer, EmptyHex } from "./Battle.styled";
import Unit from "../Unit";
import { getStringFromCoord } from "./Battle.utils";
import { WIDTH_ARRAY, WIDTH } from "./Battle.constants";

function BattleLine(props: BattleLineProps) {
    const { hexes, unitsOnBoard, highlightedHexes, lineNumber, onMouseEnterHex, onHexClick } = props;

    const mouseEnter = (hex: HexType) => (e: React.SyntheticEvent) => onMouseEnterHex(hex);
    const onClick = (hex: HexType) => (e: React.SyntheticEvent) => onHexClick(hex);

    return (
        <LineContainer width={WIDTH} lineNumber={lineNumber} key={lineNumber}>
            {WIDTH_ARRAY.map(i => {
                const hex: HexType = hexes[getStringFromCoord({ x: i, y: lineNumber })];

                let renderUnit;
                const unit = unitsOnBoard[getStringFromCoord(hex.coord)];
                if (unit) {
                    renderUnit = <Unit unit={unit} />;
                }

                if (hex.isEmpty) return <EmptyHex key={i}>&nbsp;</EmptyHex>;

                return (
                    <Hex
                        onMouseEnter={mouseEnter(hex)}
                        onClick={onClick(hex)}
                        highlight={highlightedHexes[getStringFromCoord(hex.coord)]}
                        key={i}
                    >
                        <LabelWrap>
                            {i}:{lineNumber}
                        </LabelWrap>
                        &nbsp;{renderUnit}
                    </Hex>
                );
            })}
        </LineContainer>
    );
}

export default BattleLine;
export { BattleLine };
