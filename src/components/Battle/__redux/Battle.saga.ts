import { all, takeEvery, select, call, put } from "redux-saga/effects";
import { getType, ActionType } from "deox";
import * as actions from "./Battle.actions";
import { preparedUnits } from "./Battle.selectors";
import { selectUnit } from "../../Unit/InfoPanel/__redux/InfoPanel.actions";
import { PreparedUnit } from "../Battle.types";
import { unit as selectedUnit } from "../../Unit/InfoPanel/__redux/InfoPanel.selectors";
import { getUnitInHexOrNull } from "../Battle.utils";

function* hexClickSaga(action: ActionType<typeof actions.clickHex>) {
    const { payload: hex } = action;
    const prepared: PreparedUnit[] = yield select(preparedUnits);
    const selected = yield select(selectedUnit);
    if (selected && hex.isHighlighted) {
    } else {
        const unitInHex = yield call(getUnitInHexOrNull, hex, prepared);
        yield put(selectUnit(unitInHex));
    }
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.clickHex), hexClickSaga)]);
}
