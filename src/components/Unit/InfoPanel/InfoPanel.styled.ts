import styled from "styled-components";
import { HpValueProps } from "../Unit.styled";

export const Wrap = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
`;

interface ImageProps {
    image: string;
}

export const Image = styled.div<ImageProps>`
    margin-left: 20px;
    height: 150px;
    width: 120px;
    background: url('${props => props.image}');
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
`;

export const UnitInfoWrap = styled.div`
    display: inline-flex;
    flex-direction: column;
    vertical-align: top;
`;

export const HpBar = styled.div`
    height: 32px;
    background-color: #009933;
    display: inline-flex;
    flex-direction: column-reverse;
    width: 170px;
    z-index: 2;
    margin-top: 10px;
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid #004d1a;
    position: relative;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;

export const HpValue = styled.div<HpValueProps>`
    background-color: red;
    position: absolute;
    right: 0;
    width: ${({ maxHp, currentHp }) => {
        const width = 100 - (currentHp / maxHp) * 100;
        return `${width}%`;
    }};
    height: 100%;
`;

export const DamageIcon = styled.div`
    background-image: url("/images/icons/512x512/sword-512.webp");
    background-size: contain;
    height: 32px;
    width: 32px;
    display: inline-block;
    margin-left: 6px;
`;

export const Damage = styled.div`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;
