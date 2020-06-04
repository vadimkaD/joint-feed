import { createReducer } from "deox";
import { Owner } from "../../../core/Battle/Unit.types";
import { setPlayer } from "./Player.actions";

export const owner = createReducer(null as Owner | null, handleAction => [
    handleAction(setPlayer, (state, { payload }) => payload),
]);
