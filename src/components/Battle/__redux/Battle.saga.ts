import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Battle.actions";
import { unitsOnBoard } from "./Battle.selectors";
import { selectUnit } from "../../InfoPanel/__redux/InfoPanel.actions";
import { unit as selectedUnit } from "../../InfoPanel/__redux/InfoPanel.selectors";
import { getStringFromCoord } from "../Battle.utils";
import { selectedAbility } from "../../Abilities/__redux/Abilities.selectors";
import { abilitiesDictionary } from "../../Abilities";
import { ABILITIES } from "../../Abilities/Abilities.constants";

function* hexClickSaga(action: ActionType<typeof actions.clickHex>) {
    const { payload: hex } = action;
    const boardUnits = yield select(unitsOnBoard);
    const selected = yield select(selectedUnit);
    const abilityKey: ABILITIES | null = yield select(selectedAbility);
    const key = getStringFromCoord(hex.coord);
    const boardUnit = boardUnits[key];

    if (boardUnit) {
        yield put(selectUnit(boardUnit.id));
    } else if (selected !== undefined && abilityKey) {
        const ability = abilitiesDictionary[abilityKey];
        yield put(ability.onHexClick(hex));
    }
}

function* mouseEnterHexSaga(action: ActionType<typeof actions.mouseEnterHex>) {
    yield;
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.clickHex), hexClickSaga)]);
    yield all([takeEvery(getType(actions.mouseEnterHex), mouseEnterHexSaga)]);
}
