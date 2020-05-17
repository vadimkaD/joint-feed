import React from "react";
import { getCenter, getHexCoords, getPointsFromCoords } from "./Battlefield.utils";
import { HEX_SIZE, WIDTH_ARRAY } from "./Battlefield.constants";
import { Group, InteractiveHexPolygon, Text } from "./Battlefield.styled";
import { BattlefieldLineProps } from "./Battlefield.types";
import { getHighlightComponent } from "./Battlefield.highlights";
import { getStringFromCoord } from "../../hexagons";
import { Hex } from "../Hexes/Hexes.types";

function BattlefieldLine(props: BattlefieldLineProps) {
    const { hexes, highlightedHexes, lineNumber, onMouseEnterHex, onHexClick } = props;

    const mouseEnter = (hex: Hex) => (e: React.SyntheticEvent) => onMouseEnterHex(hex);
    const onClick = (hex: Hex) => (e: React.SyntheticEvent) => onHexClick(hex);

    return (
        <>
            {WIDTH_ARRAY.map(i => {
                const center = getCenter(i, lineNumber);
                const points = getPointsFromCoords(getHexCoords(center, HEX_SIZE));
                const hex: Hex = hexes[getStringFromCoord({ x: i, y: lineNumber })];
                if (hex.isEmpty) return null;
                const highlight = highlightedHexes[getStringFromCoord(hex.coord)];
                let highlightRender;
                if (highlight) {
                    highlightRender = getHighlightComponent[highlight]({ center });
                }
                return (
                    <Group key={i}>
                        <InteractiveHexPolygon points={points} onMouseEnter={mouseEnter(hex)} onClick={onClick(hex)} />
                        {highlightRender}
                        <Text x={center.x} y={center.y}>
                            <tspan dy="4">{`${i}:${lineNumber}`}</tspan>
                        </Text>
                    </Group>
                );
            })}
        </>
    );
}

export default BattlefieldLine;
