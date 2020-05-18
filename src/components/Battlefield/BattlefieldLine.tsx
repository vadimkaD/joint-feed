import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCenter, getHexCoords, getPointsFromCoords } from "./Battlefield.utils";
import { HEX_SIZE, WIDTH_ARRAY } from "./Battlefield.constants";
import { Group, InteractiveHexPolygon, Text } from "./Battlefield.styled";
import { BattlefieldLineProps } from "./Battlefield.types";
import { getHighlightComponent } from "./Battlefield.highlights";
import { getStringFromCoord } from "../../hexagons";
import { Hex, Hexes } from "../Hexes/Hexes.types";
import { hexes as hexesSelector } from "../Hexes/__redux/Hexes.selectors";
import { clickHex, mouseEnterHex } from "../Hexes/__redux/Hexes.actions";
import { highlightedHexes as highlightedHexesSelector } from "../Battle/__redux/Battle.selectors";
import { HightlightedHexes } from "../Battle/Battle.types";

const BattlefieldLine: React.FunctionComponent<BattlefieldLineProps> = props => {
    const dispatch = useDispatch();
    const hexes: Hexes = useSelector(hexesSelector);
    const highlightedHexes: HightlightedHexes = useSelector(highlightedHexesSelector);

    const onMouseEnterHex = (hex: Hex) => (e: React.SyntheticEvent) => dispatch(mouseEnterHex(hex));
    const onClick = (hex: Hex) => (e: React.SyntheticEvent) => dispatch(clickHex(hex));

    const { lineNumber } = props;

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
                        <InteractiveHexPolygon
                            points={points}
                            onMouseEnter={onMouseEnterHex(hex)}
                            onClick={onClick(hex)}
                        />
                        {highlightRender}
                        <Text x={center.x} y={center.y}>
                            <tspan dy="4">{`${i}:${lineNumber}`}</tspan>
                        </Text>
                    </Group>
                );
            })}
        </>
    );
};

export default BattlefieldLine;
