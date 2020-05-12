import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import { v4 as uuidv4 } from "uuid";
import * as actions from "./MagicArrow.actions";
import { unit } from "../../../InfoPanel/__redux/InfoPanel.selectors";
import { Coord, PreparedUnit, UnitsOnBoard } from "../../../Battle/Battle.types";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { ABILITIES } from "../../Abilities.constants";
import { actionComplete, updateUnit } from "../../../Battle/__redux/Battle.actions";
import { selectAbility } from "../../__redux/Abilities.actions";
import { CAST_RANGE, CAST_TIME, DELAY } from "../MagicArrow.constants";
import { Action } from "../../../ActionQueue/ActionQueue.types";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { isInRange } from "../../../Battle/Battle.utils";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { getCoordOfUnitForCurrentTick } from "../../Abilities.saga";
import { ACTION_POINTS } from "../../../Battle/Battle.constants";
import { Effect } from "../../../Effects/Effects.types";
import { addEffect } from "../../../Effects/__redux/Effects.actions";
import { AbilityAnimation } from "../../../Animations/Animations.types";
import { addAnimation } from "../../../Animations/__redux/Animations.actions";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    console.log("hexClickSaga", hex);
    const selectedUnit: PreparedUnit = { ...(yield select(unit)) };

    if (selectedUnit.currentActionPoints < CAST_TIME) {
        console.log("You cant cast it - not enough points");
        return;
    }

    const tickNumber: number = yield select(tick);

    const actionId = uuidv4();
    for (let i = 0; i < CAST_TIME; i++) {
        yield put(
            addAction({
                tickStart: tickNumber + (ACTION_POINTS - selectedUnit.currentActionPoints),
                actionId: actionId,
                unitId: selectedUnit.id,
                target: [hex.coord],
                ability: ABILITIES.MAGIC_ARROW,
            }),
        );
    }

    selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - CAST_TIME;
    yield put(updateUnit(selectedUnit));
    yield put(selectAbility(null));
}

function* handleEffectSaga(reduxAction: ActionType<typeof actions.handleEffect>) {
    const action = reduxAction.payload as Action;
    console.log("action in applyEffectSaga magicArrow", action);
    const units: UnitsOnBoard = yield select(unitsOnBoard);
    const unit = Object.values(units).find(unit => unit.id === action.unitId) as PreparedUnit | null;

    if (unit) {
        const unitCoord = yield getCoordOfUnitForCurrentTick(unit);

        const coord = action.target[0] as Coord | undefined;
        if (coord) {
            if (isInRange(unitCoord, coord, CAST_RANGE)) {
                const effect: Effect = {
                    sourceUnitId: unit.id,
                    effectId: action.actionId,
                    abilityId: ABILITIES.MAGIC_ARROW,
                    targetAndValue: [{ coord: coord }, { currentHp: -unit.damage }],
                };

                yield put(
                    addEffect({
                        tick: action.tickStart + DELAY,
                        effect: effect,
                    }),
                );

                const animation: AbilityAnimation = {
                    animationId: action.actionId,
                    params: { from: unitCoord, to: coord },
                    ability: ABILITIES.MAGIC_ARROW,
                };

                yield put(
                    addAnimation({
                        tick: action.tickStart,
                        animation,
                    }),
                );

                console.log("MagicArrow.saga [unitCoord, coord]:", [JSON.stringify(unitCoord), JSON.stringify(coord)]);
            } else {
                console.log("FIZZLE! Not enough range", unitCoord, coord);
            }
        }
    }

    yield put(actionComplete());
}

export default function* magicArrowSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
    yield all([takeEvery(getType(actions.handleEffect), handleEffectSaga)]);
}
