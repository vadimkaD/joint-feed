import styled from "styled-components";
import { TICK_TIMEOUT } from "../../Battle/Battle.constants";
import { HiddenProps, TransitionProps } from "../Abilities.types";
import { abilities } from "../../../core/Abilities";

const maAbility = abilities.MAGIC_ARROW;

export const ArrowCircle = styled.circle<TransitionProps & HiddenProps>`
    transition-duration: ${props => (TICK_TIMEOUT * maAbility.castTime) / 1000}s;
    transition-timing-function: ease;
    stroke-dasharray: 6 6;
    stroke: #bf360c;
    fill: #616161;
    stroke-width: 4px;
    ${props => `
        transform: matrix(1, 0, 0, 1, ${props.translateX}, ${props.translateY});
    `}
    ${props => (props.isHidden ? "visibility: hidden;" : "")}
`;
