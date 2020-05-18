import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import { unitsOnBoard } from "../../Battle/__redux/Battle.selectors";
import { ABILITIES } from "../../Abilities/Abilities.constants";
import { selectedAbility } from "../../Abilities/__redux/Abilities.selectors";
import { getStringFromCoord } from "../../../hexagons";
import { abilitiesDictionary } from "../../Abilities";
import { clickHex } from "./Hexes.actions";
import { selectedUnit } from "../../SelectedUnit/__redux/SelectedUnit.selectors";
import { selectUnit } from "../../SelectedUnit/__redux/SelectedUnit.actions";

function* hexClickSaga(action: ActionType<typeof clickHex>) {
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

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(clickHex), hexClickSaga)]);
}
