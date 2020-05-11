import styled from "styled-components";
import { UnitImage } from "../../Battlefield/Units/Units.styled";
import { TICK_TIMEOUT } from "../../Battle/Battle.constants";
import { UnitImageWithTransitionProps } from "./Move.types";

export const UnitImageWithTransition = styled(UnitImage)<UnitImageWithTransitionProps>`
    transition-duration: ${props => TICK_TIMEOUT / 1000}s;
    border: 1px solid red;
    ${props => `
        transform: matrix(1, 0, 0, 1, ${props.translateX}, ${props.translateY});
    `}
`;
