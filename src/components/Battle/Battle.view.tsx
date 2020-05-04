import React from "react";
import { BattleViewProps } from "./Battle.types";
import { CenterWrapper } from "./Battle.styled";
import InfoPanel from "../Unit/InfoPanel/InfoPanel";

import Battlefield from "../Battlefield/Battlefield";

function BattleView(props: BattleViewProps) {
    return (
        <CenterWrapper>
            <Battlefield {...props} />
            <InfoPanel />
        </CenterWrapper>
    );
}

export default BattleView;
export { BattleView };
