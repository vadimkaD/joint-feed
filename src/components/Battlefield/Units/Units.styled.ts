import styled from "styled-components";
import { UNIT_SIZE } from "./Units.constants";

export const UnitImage = styled.image`
    width: ${() => UNIT_SIZE}px;
    height: ${() => UNIT_SIZE}px;
    pointer-events: none;
`;
