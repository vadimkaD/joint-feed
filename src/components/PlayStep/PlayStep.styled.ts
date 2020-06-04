import styled from "styled-components";

export const Wrap = styled.div`
    border-radius: 0 0 50% 50%;
    position: relative;
    background: #546e7a;
    width: 70px;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    svg {
        font-size: 46px;
    }
    display: flex;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: #90a4ae;
    }
`;

export const StepNumber = styled.div`
    background: #546e7a;
    font-size: 14px;
    left: -55px;
    width: 55px;
    position: absolute;
    top: 0;
    padding-left: 4px;
`;
