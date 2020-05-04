import React from "react";
import { getCenter, getHexCoords, getPointsFromCoords } from "./Battlefield.utils";
import { HEX_SIZE, WIDTH_ARRAY } from "./Battlefield.constants";
import { Group, InteractiveHexPolygon, Text } from "./Battlefield.styled";
import { BattlefieldLineProps, Highlight } from "./Battlefield.types";
import { Hex as HexType } from "../Battle/Battle.types";
import { getStringFromCoord } from "../Battle/Battle.utils";
import { Hover, Route } from "./Battlefield.highlights";

function BattlefieldLine(props: BattlefieldLineProps) {
    const { hexes, highlightedHexes, lineNumber, onMouseEnterHex, onHexClick } = props;

    const mouseEnter = (hex: HexType) => (e: React.SyntheticEvent) => onMouseEnterHex(hex);
    const onClick = (hex: HexType) => (e: React.SyntheticEvent) => onHexClick(hex);

    return (
        <>
            {WIDTH_ARRAY.map(i => {
                const center = getCenter(i, lineNumber);
                const points = getPointsFromCoords(getHexCoords(center, HEX_SIZE));
                const hex: HexType = hexes[getStringFromCoord({ x: i, y: lineNumber })];
                if (hex.isEmpty) return null;
                const highlight = highlightedHexes[getStringFromCoord(hex.coord)];
                let highlightRender;
                switch (highlight) {
                    case Highlight.HOVER:
                        highlightRender = <Hover points={points} />;
                        break;
                    case Highlight.ROUTE:
                        highlightRender = <Route center={center} />;
                        break;
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
