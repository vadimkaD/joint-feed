import { InfoPanelState } from "../InfoPanel.types";
import { BattleUnit } from "../../../Battle/Battle.types";
import { Unit } from "../../../Player/Units/Units.types";

export const unit = (state: InfoPanelState) => state.Unit.InfoPanel.unit as Unit & BattleUnit;
