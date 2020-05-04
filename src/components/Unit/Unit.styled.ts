import styled from "styled-components";

export interface UnitImageProps {
    image: string;
}

export const UnitImage = styled.div<UnitImageProps>`
    background: ${(props: UnitImageProps) => {
        return props.image ? `url('${props.image}')` : "rgba(0,0,0,0)";
    }};
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 2;
    width: 100%;
    height: 100%;
`;

export const UnitWrapper = styled.div`
    width: 88px;
    height: 120px;
    display: inline-flex;
    flex-direction: row;
    top: -30%;
    position: relative;
`;

export const HpBar = styled.div`
    height: 7px;
    background-color: #009933;
    display: inline-block;
    width: 80%;
    position: absolute;
    left: 10%;
    bottom: -7px;
    z-index: 2;
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid #004d1a;
`;

export interface HpValueProps {
    maxHp: number;
    currentHp: number;
}

export const HpValue = styled.div<HpValueProps>`
    background-color: red;
    position: absolute;
    right: 0;
    top: 0;
    width: ${({ maxHp, currentHp }) => {
        const width = 100 - (currentHp / maxHp) * 100;
        return `${width}%`;
    }};
    height: 100%;
`;
