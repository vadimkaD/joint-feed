import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./MagicArrow.actions";
import { unit } from "../../../InfoPanel/__redux/InfoPanel.selectors";
import { PreparedUnit } from "../../../Battle/Battle.types";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { ABILITIES } from "../../Abilities.constants";
import { updateUnit } from "../../../Battle/__redux/Battle.actions";
import { selectAbility } from "../../__redux/Abilities.actions";
import { CAST_TIME } from "../MagicArrow.constants";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    console.log("hexClickSaga", hex);
    const selectedUnit: PreparedUnit = { ...(yield select(unit)) };
    if (!selectedUnit.currentActionPoints) return;

    yield put(addAction({ unitId: selectedUnit.id, target: hex.coord, ability: ABILITIES.MAGIC_ARROW }));
    selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - CAST_TIME;
    yield put(updateUnit(selectedUnit));
    yield put(selectAbility(null));
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
}
