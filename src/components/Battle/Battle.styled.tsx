import styled from "styled-components";
import { LineContainerProps } from "./Battle.types";
import { LEFT, TOP } from "./Battle.constants";

export const Hex = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    width: 108px;
    background: #febf00;
    -webkit-clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
    clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
    position: absolute;
    pointer-events: all;
    color: black;
`;

export const EmptyHex = styled(Hex)`
    pointer-events: none;
    background: rgba(0, 0, 0, 0);
`;

export const LineContainer = styled.div`
    display: flex;
    pointer-events: none;
    flex-wrap: wrap;
    height: 140px;
    position: relative;
    overflow: visible;
    ${(props: LineContainerProps) => `margin-top: ${props.notFirst ? "-48px" : 0};`}
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
