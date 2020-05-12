import styled from "styled-components";
import { AbilityIconProps, HpValueProps, UnitProps } from "./InfoPanel.types";

export const Wrap = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 170px;
    background: gray;
    border-top: 1px solid black;
    box-sizing: border-box;
    box-shadow: 0px -5px 14px 3px rgba(0, 0, 0, 1);
    display: flex;
    justify-content: space-between;
`;

export const UnitImage = styled.div<UnitProps>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 72px);
    width: 144px;
    height: 144px;
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
    margin-bottom: 20px;
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
    width: calc(50% - 92px);
    background: green;

    height: 170px;
`;

export const Tick = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    height: 48px;
    width: 48px;
    margin-right: 10px;
    margin-left: 10px;
    :first-child {
        margin-left: 10px;
    }
    :last-child {
        margin-right: 0px;
    }
    background-color: gray;
`;

export const TickBar = styled.div`
    width: 100%;
    display: flex;
    height: 48px;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: -58px;
`;

export const AbilityPanel = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    align-content: flex-start;
    background: #546e7a;
    height: 170px;
    width: 310px;
    line-height: 0;
`;

export const AbilityIconWrap = styled.div`
    height: 70px;
    margin-left: 10px;
    margin-top: 10px;
    width: 90px;
    background: #37474f;
`;

export const AbilityIcon = styled.div<AbilityIconProps>`
    height: 70px;
    width: 70px;
    background: #90a4ae;
    display: inline-block;
    background-image: ${({ icon }) => `url('${icon}')`};
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    ${({ isSelected }) => isSelected && `border: 2px solid white;`}
    cursor: pointer;
`;
