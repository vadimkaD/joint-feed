import styled from "styled-components";
import { TICK_TIMEOUT } from "../../Battle/Battle.constants";
import { CAST_TIME } from "./MagicArrow.constants";
import { TransitionProps } from "../Abilities.types";

export const ArrowCircle = styled.circle<TransitionProps>`
    transition-duration: ${props => (TICK_TIMEOUT * CAST_TIME) / 1000}s;
    stroke-dasharray: 6 6;
    stroke: #bf360c;
    fill: #616161;
    stroke-width: 4px;
    ${props => `
        transform: matrix(1, 0, 0, 1, ${props.translateX}, ${props.translateY});
    `}
`;
