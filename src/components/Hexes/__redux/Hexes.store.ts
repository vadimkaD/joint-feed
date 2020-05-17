import { createReducer } from "deox";
import { defaultHexes } from "../../Battlefield/Battlefield.constants";
import { Hexes } from "../Hexes.types";

export const hexes = createReducer(defaultHexes as Hexes, handleAction => []);
