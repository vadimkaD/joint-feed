import React from "react";
import { WIDTH_ARRAY } from "../Battlefield.constants";
import { BattlefieldLineProps } from "../Battlefield.types";
import LineGroup from "./LineGroup";

const BattlefieldLine: React.FunctionComponent<BattlefieldLineProps> = props => {
    const { lineNumber } = props;

    return (
        <>
            {WIDTH_ARRAY.map(i => (
                <LineGroup key={i} i={i} lineNumber={lineNumber} />
            ))}
        </>
    );
};

export default BattlefieldLine;
