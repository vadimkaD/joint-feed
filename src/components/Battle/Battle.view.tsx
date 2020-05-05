import React from "react";
import { BattleViewProps } from "./Battle.types";
import { CenterWrapper } from "./Battle.styled";
import InfoPanel from "../InfoPanel/InfoPanel";

import Battlefield from "../Battlefield/Battlefield";
import UnitIconPanel from "../UnitIconPanel/UnitIconPanel";

function BattleView(props: BattleViewProps) {
    return (
        <CenterWrapper>
            <Battlefield {...props} />
            <InfoPanel />
            <UnitIconPanel />
        </CenterWrapper>
    );
}

export default BattleView;
export { BattleView };
