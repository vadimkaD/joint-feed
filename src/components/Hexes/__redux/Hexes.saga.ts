import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import { unitsOnBoard } from "../../Battle/__redux/Battle.selectors";
import { getStringFromCoord } from "../../../core/Hexagons";
import { abilitiesDictionary } from "../../Abilities";
import { clickHex } from "./Hexes.actions";
import { selectedUnit } from "../../SelectedUnit/__redux/SelectedUnit.selectors";
import { selectUnit } from "../../SelectedUnit/__redux/SelectedUnit.actions";
import { selectedAbility } from "../../SelectedAbility/__redux/SelectedAbility.selectors";
import { ABILITIES } from "../../../core/Abilities/Abilities.constants";

function* hexClickSaga(action: ActionType<typeof clickHex>) {
    const { payload: hex } = action;
    const boardUnits = yield select(unitsOnBoard);
    const selected = yield select(selectedUnit);
    const abilityKey: ABILITIES | null = yield select(selectedAbility);
    const key = getStringFromCoord(hex.coord);
    const boardUnit = boardUnits[key];

    if (selected !== undefined && abilityKey) {
        const ability = abilitiesDictionary[abilityKey];
        yield put(ability.onHexClick(hex));
        console.log("ta-da!");
    } else if (boardUnit) {
        yield put(selectUnit(boardUnit.id));
    }
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(clickHex), hexClickSaga)]);
}
