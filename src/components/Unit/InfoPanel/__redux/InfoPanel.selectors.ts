import { InfoPanelState } from "../InfoPanel.types";
import { PreparedUnit } from "../../../Battle/Battle.types";
import { Unit } from "../../../Player/Units/Units.types";

export const unit = (state: InfoPanelState) => state.Unit.InfoPanel.unit as PreparedUnit | null;
