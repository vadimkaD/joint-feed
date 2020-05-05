import styled from "styled-components";
import { InteractivePolygonProps, PolygonProps } from "./Battlefield.types";
import { BORDER_SIZE } from "./Battlefield.constants";

export const Polygon = styled.polygon<PolygonProps>``;
export const HighlightPolygon = styled.polygon<PolygonProps>`
    pointer-events: none;
    fill: #ffd75f;
`;

export const SelectedUnitPolygon = styled.polygon<PolygonProps>`
    pointer-events: none;
    fill: #ffffff;
`;

export const InteractiveHexPolygon = styled.polygon<InteractivePolygonProps>`
    fill: #febf00;
    stroke-width: ${() => BORDER_SIZE};
    stroke: #f0f0f0;
    pointer-events: all;
    cursor: pointer;
`;

export const HighlightImage = styled.image`
    pointer-events: none;
`;

export const Group = styled.g`
    :hover {
        text {
            fill: black;
        }
    }
`;

export const Text = styled.text`
    pointer-events: none;
    font-size: 12px;
    fill: white;
    text-anchor: middle;
`;
