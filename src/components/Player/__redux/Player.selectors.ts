import { PlayerState } from "../Player.types";
import { Owner } from "../../../core/Battle/Unit.types";

export const owner = (state: PlayerState): Owner | null => state.Player.owner;
