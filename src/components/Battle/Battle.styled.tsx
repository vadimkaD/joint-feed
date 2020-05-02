import styled from "styled-components";
import { LineContainerProps, WayThrough } from "./Battle.types";
import { HEX_HEIGHT, HEX_WIDTH, LEFT } from "./Battle.constants";

interface HexProps {
    isHighlighted?: boolean;
    way?: WayThrough;
}

const wayBackground = {
    [WayThrough.LEFT_TO_RIGHT]: "url('/images/hexes/way/left-to-right.png')",
    [WayThrough.LEFT_TOP_TO_RIGHT_BOTTOM]: "url('/images/hexes/way/left-top-to-right-bottom.png')",
    [WayThrough.RIGHT_TOP_TO_LEFT_BOTTOM]:
        "linear-gradient(120deg, rgba(254,191,0,1) 45%, rgba(255,255,255,1) 50%, rgba(254,191,0,1) 55%)",
    [WayThrough.LEFT_TOP_TO_RIGHT]: "url('/images/hexes/way/left-top-to-right.png')",
    [WayThrough.LEFT_TOP_TO_RIGHT_TOP]: "url('/images/hexes/way/left-top-to-right-top.png')",
    [WayThrough.LEFT_TOP_TO_LEFT_BOTTOM]: "url('/images/hexes/way/left-top-to-left-bottom.png')",
    [WayThrough.LEFT_TOP_TO_LEFT]: "url('/images/hexes/way/left-top-to-left.png')",
    [WayThrough.LEFT_TO_RIGHT_TOP]: "url('/images/hexes/way/left-to-right-top.png')",
    [WayThrough.LEFT_TO_RIGHT_BOTTOM]: "url('/images/hexes/way/left-to-right-bottom.png')",
    [WayThrough.LEFT_TO_LEFT_BOTTOM]: "url('/images/hexes/way/left-to-left-bottom.png')",
    [WayThrough.RIGHT_TOP_TO_RIGHT]: "url('/images/hexes/way/right-top-to-right.png')",
    [WayThrough.RIGHT_TOP_TO_RIGHT_BOTTOM]: "url('/images/hexes/way/right-top-to-right-bottom.png')",
    [WayThrough.RIGHT_TO_RIGHT_BOTTOM]: "url('/images/hexes/way/right-to-right-bottom.png')",
    [WayThrough.RIGHT_TO_LEFT_BOTTOM]: "url('/images/hexes/way/right-to-left-bottom.png')",
    [WayThrough.LEFT_BOTTOM_TO_RIGHT_BOTTOM]: "url('/images/hexes/way/left-bottom-to-right-bottom.png')",
    [WayThrough.CENTER_TO_LEFT_BOTTOM]: "url('/images/hexes/way/center-to-left-bottom.png')",
    [WayThrough.CENTER_TO_RIGHT_BOTTOM]: "url('/images/hexes/way/center-to-right-bottom.png')",
    [WayThrough.CENTER_TO_RIGHT]: "url('/images/hexes/way/center-to-right.png')",
    [WayThrough.CENTER_TO_RIGHT_TOP]: "url('/images/hexes/way/center-to-right-top.png')",
    [WayThrough.CENTER_TO_LEFT_TOP]: "url('/images/hexes/way/center-to-left-top.png')",
    [WayThrough.CENTER_TO_LEFT]: "url('/images/hexes/way/center-to-left.png')",
};

export const Hex = styled.div<HexProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: ${HEX_HEIGHT}px;
    width: ${HEX_WIDTH}px;
    position: relative;
    pointer-events: all;
    color: black;
    margin-bottom: 2px;
    :after {
        content: "";
        position: absolute;
        -webkit-clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
        clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
        height: ${HEX_HEIGHT}px;
        width: ${HEX_WIDTH}px;
        background: ${props =>
            props.isHighlighted ? "radial-gradient(circle, #febf00 35%, rgba(255,255,255,1) 100%)" : "#febf00"};
        transform: rotate(30deg);
    }
    :hover {
        :after {
            background: rgb(204, 255, 229);
        }
    }
`;

export const EmptyHex = styled(Hex)`
    pointer-events: none;
    :after {
        background: rgba(0, 0, 0, 0);
    }
`;

export const LineContainer = styled.div<LineContainerProps>`
    display: inline-block;
    pointer-events: none;
    flex-wrap: nowrap;
    position: relative;
    overflow: visible;
    left: ${props => ((props.lineNumber % 2) - 1 ? "0" : "-48px")};
    top: ${props => props.lineNumber * -13 + "px"};
    ${(props: LineContainerProps) => {
        let total = "";
        for (let i = 0; i < props.width; i++) {
            const left = LEFT * (i + 1);

            total += `${Hex}:nth-child(${i + 2}) {
                left: ${left}px;
             
            }`;
        }
        return total;
    }};
`;

export interface BattleViewWrapperProps {
    width: number;
}

export const BattleViewWrapper = styled.div<BattleViewWrapperProps>`
    min-width: ${props => {
        return `${HEX_WIDTH * props.width}px`;
    }};
    margin-left: ${props => {
        return `calc((100vw - ${86 * props.width}px) / 2)`;
    }};
    display: inline-block;
    margin-top: -24px;
`;

export const CenterWrapper = styled.div`
    display: flex;
    padding-top: 50px;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

export const LabelWrap = styled.div`
    position: absolute;
    width: 37px;
    text-align: center;
    height: 20px;
    right: 52px;
    bottom: 7px;
    z-index: 2;
    border-radius: 2px;
    transform: rotate(30deg);
    font-size: 12px;
`;
