import styled from "styled-components";
import { TICK_TIMEOUT } from "../../Battle/Battle.constants";
import { UNIT_SIZE } from "../Units/Units.constants";

export const UnitImage = styled.image`
    width: ${() => UNIT_SIZE}px;
    height: ${() => UNIT_SIZE}px;
    pointer-events: none;
    transition: ${props => TICK_TIMEOUT / 1000}s;
`;
