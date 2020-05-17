import { createReducer } from "deox";
import { defaultHexes } from "../../Battlefield/Battlefield.constants";
import { Hex, Hexes } from "../Hexes.types";
import { mouseEnterHex } from "./Hexes.actions";
import { mouseLeaveBoard } from "../../Battle/__redux/Battle.actions";

export const hexes = createReducer(defaultHexes as Hexes, handleAction => []);
export const hexUnderCursor = createReducer(null as Hex | null, handleAction => [
    handleAction(mouseEnterHex, (state, { payload }) => payload),
    handleAction(mouseLeaveBoard, () => null),
]);
