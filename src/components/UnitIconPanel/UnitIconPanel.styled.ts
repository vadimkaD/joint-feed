import styled from "styled-components";
import { UnitIconProps } from "./UnitIconPanel.types";
import { FORM_FACTORS, UNIT_IMAGES } from "../Battlefield/Units/Units.constants";

export const IconPanel = styled.div`
    position: fixed;
    left: 10px;
    top: 10px;
    width: 74px;
`;

export const UnitIcon = styled.div<UnitIconProps>`
    display: inline-block;
    border: 1px solid #d0d0d0;
    width: 72px;
    height: 72px;
    background-image: ${props => `url('${UNIT_IMAGES[props.unit.formFactor as FORM_FACTORS]}')`};
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    :hover {
        background-color: gray;
    }
`;
