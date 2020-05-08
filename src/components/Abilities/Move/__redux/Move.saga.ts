import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Move.actions";
import { getRoute, isSameCoord } from "../../../Battle/Battle.utils";
import { unit } from "../../../InfoPanel/__redux/InfoPanel.selectors";
import { PreparedUnit } from "../../../Battle/Battle.types";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { ABILITIES } from "../../Abilities.constants";
import { updateUnit } from "../../../Battle/__redux/Battle.actions";
import { selectAbility } from "../../__redux/Abilities.actions";
import { queue } from "../../../ActionQueue/__redux/ActionQueue.external-selectors";
import { getEffectedUnit, getEffectsForSelectedUnit } from "../../Abilities.utils";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { Action } from "../../../ActionQueue/ActionQueue.types";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    console.log("hexClickSaga", hex);
    const selectedUnit: PreparedUnit = { ...(yield select(unit)) };
    if (!selectedUnit.currentActionPoints) return;

    const actionQueue: Action[] = yield select(queue);
    const preparedUnitsOnBoard = yield select(unitsOnBoard);
    const effects = getEffectsForSelectedUnit(actionQueue, preparedUnitsOnBoard, selectedUnit);
    const effectedUnit = getEffectedUnit(effects, selectedUnit);
    const route = getRoute(hex.coord, effectedUnit.coord).filter(coord => !isSameCoord(effectedUnit.coord, coord));
    console.log("route", route);
    for (const coord of route) {
        yield put(addAction({ unitId: effectedUnit.id, target: coord, ability: ABILITIES.MOVE }));
        selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - 1;
        yield put(updateUnit(selectedUnit));
    }
    yield put(selectAbility(null));
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
}
