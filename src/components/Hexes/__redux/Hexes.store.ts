import { createReducer } from "deox";
import { defaultHexes } from "../../Battlefield/Battlefield.constants";
import { mouseEnterHex, setHexes } from "./Hexes.actions";
import { mouseLeaveBoard } from "../../Battle/__redux/Battle.actions";
import { Hex, Hexes } from "../../../core/Battle/Battle.types";

export const hexes = createReducer(defaultHexes as Hexes, handleAction => [
    handleAction(setHexes, (state, { payload }) => payload),
]);
export const hexUnderCursor = createReducer(null as Hex | null, handleAction => [
    handleAction(mouseEnterHex, (state, { payload }) => payload),
    handleAction(mouseLeaveBoard, () => null),
]);
