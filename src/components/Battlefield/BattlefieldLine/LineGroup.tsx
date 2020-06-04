import React, { useCallback, useMemo } from "react";
import { getCenter, getHexCoords, getPointsFromCoords } from "../Battlefield.utils";
import { HEX_SIZE } from "../Battlefield.constants";
import { Hex, Hexes } from "../../../core/Battle/Battle.types";
import { getStringFromCoord } from "../../../core/Hexagons";
import { getHighlightComponent } from "../Battlefield.highlights";
import { Group, InteractiveHexPolygon, Text } from "../Battlefield.styled";
import { LineGroupProps } from "./LineGroup.types";
import { clickHex, mouseEnterHex } from "../../Hexes/__redux/Hexes.actions";
import { useDispatch, useSelector } from "react-redux";
import { hexes as hexesSelector } from "../../Hexes/__redux/Hexes.selectors";
import { HightlightedHexes } from "../../Battle/Battle.types";
import { highlightedHexes as highlightedHexesSelector } from "../../Battle/__redux/Battle.selectors";

const LineGroup: React.FunctionComponent<LineGroupProps> = React.memo(({ i, lineNumber }) => {
    const dispatch = useDispatch();
    const hexes: Hexes = useSelector(hexesSelector);
    const highlightedHexes: HightlightedHexes = useSelector(highlightedHexesSelector);
    const hex: Hex = useMemo<Hex>(() => hexes[getStringFromCoord({ x: i, y: lineNumber })], [hexes, i, lineNumber]);
    const onMouseEnterHex = useCallback((e: React.SyntheticEvent) => dispatch(mouseEnterHex(hex)), [dispatch, hex]);
    const onClick = useCallback((e: React.SyntheticEvent) => dispatch(clickHex(hex)), [dispatch, hex]);
    const center = getCenter(i, lineNumber);
    const points = getPointsFromCoords(getHexCoords(center, HEX_SIZE));

    if (hex.isEmpty) return null;
    const highlight = highlightedHexes[getStringFromCoord(hex.coord)];

    let highlightRender;
    if (highlight) {
        highlightRender = getHighlightComponent[highlight]({ center });
    }
    return (
        <Group key={i}>
            <InteractiveHexPolygon points={points} onMouseEnter={onMouseEnterHex} onClick={onClick} />
            {highlightRender}
            <Text x={center.x} y={center.y}>
                <tspan dy="4">{`${i}:${lineNumber}`}</tspan>
            </Text>
        </Group>
    );
});

export default LineGroup;
