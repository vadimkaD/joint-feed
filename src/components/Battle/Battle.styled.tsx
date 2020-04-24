import styled from "styled-components";
import { LineContainerProps } from "./Battle.types";
import { HEX_WIDTH, LEFT, TOP } from "./Battle.constants";

export const Hex = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 90px;
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
        height: 90px;
        width: ${HEX_WIDTH}px;
        background: #febf00;
    }
    :hover {
        :after {
            background: rgb(204, 255, 229);
        }
    }
`;

export const EmptyHex = styled(Hex)`
    pointer-events: none;
    background: rgba(0, 0, 0, 0);
`;

export const LineContainer = styled.div`
    display: inline-block;
    pointer-events: none;
    flex-wrap: nowrap;
    position: relative;
    overflow: visible;
    ${(props: LineContainerProps) => `margin-top: ${props.notFirst ? "0" : 0};`}
    ${(props: LineContainerProps) => {
        let total = "";
        for (let i = 0; i < props.width; i++) {
            total += `${Hex}:nth-child(${i + 2}) {
                left: ${LEFT * (i + 1)}px;
                top: ${Math.abs(TOP * ((i % 2) - 1))}px;
            }`;
        }
        return total;
    }};
`;

export const BattleViewWrapper = styled.div`
    min-width: ${(props: { width: number }) => {
        return `${HEX_WIDTH * props.width}px`;
    }};
    margin-left: ${(props: { width: number }) => {
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
