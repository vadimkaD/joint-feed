import styled from "styled-components";
import { HpValueProps, InfoPanelProps } from "./InfoPanel.types";

export const Wrap = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: gray;
    border-top: 1px solid black;
    box-sizing: border-box;
    box-shadow: 0px -5px 14px 3px rgba(0, 0, 0, 1);
    display: flex;
    justify-content: space-between;
`;

export const UnitImage = styled.div<InfoPanelProps>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 108px);
    width: 216px;
    height: 216px;
    background-image: ${props => `url('${props.unit?.image}')`};
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    background-size: cover;
    background-color: #333333;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-top: 1px solid black;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px -5px 14px 3px rgba(0, 0, 0, 1);
`;

export const HpBar = styled.div`
    width: 12px;
    height: 100%;
    background: #630303;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const HpValue = styled.div<HpValueProps>`
    width: 12px;
    height: ${({ maxHp, currentHp }) => {
        const width = 100 - (currentHp / maxHp) * 100;
        return `${100 - width}%`;
    }};
    background: #1b961b;
`;

export const Panel = styled.div`
    width: calc(50% - 108px);
    background: green;

    height: 200px;
`;
