import React from "react";
import { BattleViewProps } from "./Battle.types";
import { CenterWrapper } from "./Battle.styled";
import InfoPanel from "../InfoPanel/InfoPanel";

import Battlefield from "../Battlefield/Battlefield";
import UnitIconPanel from "../UnitIconPanel/UnitIconPanel";
import PlayStep from "../PlayStep/PlayStep";

function BattleView(props: BattleViewProps) {
    return (
        <CenterWrapper>
            <PlayStep />
            <Battlefield {...props} />
            <InfoPanel />
            <UnitIconPanel />
        </CenterWrapper>
    );
}

export default BattleView;
export { BattleView };
