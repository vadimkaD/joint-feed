import React from "react";
import { CenterWrapper } from "./Battle.styled";
import InfoPanel from "../InfoPanel/InfoPanel";

import Battlefield from "../Battlefield/Battlefield";
import UnitIconPanel from "../UnitIconPanel/UnitIconPanel";
import PlayStep from "../PlayStep/PlayStep";

const BattleView: React.FunctionComponent<{}> = props => {
    return (
        <CenterWrapper>
            <PlayStep />
            <Battlefield />
            <InfoPanel />
            <UnitIconPanel />
        </CenterWrapper>
    );
};

export default BattleView;
export { BattleView };
