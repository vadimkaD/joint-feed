import { InfoPanelState } from "../InfoPanel.types";
import { PreparedUnit } from "../../Battle/Battle.types";

export const unit = (state: InfoPanelState) => state.InfoPanel.unit as PreparedUnit | null;
