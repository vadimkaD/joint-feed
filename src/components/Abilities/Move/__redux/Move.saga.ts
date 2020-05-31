import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import { v4 as uuidv4 } from "uuid";
import * as actions from "./Move.actions";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { actionComplete } from "../../../Battle/__redux/Battle.actions";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { battleUnits } from "../../../BattleUnits/__redux/BattleUnits.selectors";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { CAST_RANGE, CAST_TIME, DELAY } from "../Move.constants";
import { addEffect } from "../../../Effects/__redux/Effects.actions";
import { getCoordOfUnitForCurrentTick } from "../../Abilities.saga";
import { addAnimation } from "../../../Animations/__redux/Animations.actions";
import { AnimationsTypes, UnitTransportAnimation } from "../../../Animations/Animations.types";
import { getStringFromCoord, isInRange, isSameCoord } from "../../../../core/Hexagons";
import { updateUnit } from "../../../BattleUnits/__redux/BattleUnits.actions";
import { selectedUnit as unit } from "../../../SelectedUnit/__redux/SelectedUnit.selectors";
import { selectAbility } from "../../../SelectedAbility/__redux/SelectedAbility.actions";
import { selectUnit } from "../../../SelectedUnit/__redux/SelectedUnit.actions";
import { hexes as hexesSelector } from "../../../Hexes/__redux/Hexes.selectors";
import { getEffectsByTick } from "../../../Effects/__redux/Effects.selectors";
import { Effect, EffectType, UnitTargetAndValue } from "../../../../core/Battle/Battle.types";
import { Unit, UnitsOnBoard } from "../../../../core/Battle/Unit.types";
import { Coord } from "../../../../core/Battle/Hexagon.types";
import { Action } from "../../../../core/Actions/Actions.types";
import { ABILITIES } from "../../../../core/Battle/Abilities.constants";
import { abilities, getUnitUpdatedByTransportPrediction } from "../../../../core/Abilities";
import { queue as queueSelector } from "../../../ActionQueue/__redux/ActionQueue.external-selectors";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    const moveAbility = abilities.MOVE;
    const selectedUnit: Unit = { ...(yield select(unit)) };
    const preparedUnitsOnBoard = yield select(unitsOnBoard);
    const units = yield select(battleUnits);
    const hexes = yield select(hexesSelector);
    const queue = yield select(queueSelector);

    const coordKey = getStringFromCoord(hex.coord);
    const boardUnit = preparedUnitsOnBoard[coordKey];
    if (boardUnit && boardUnit.id !== selectedUnit.id) {
        yield put(selectUnit(boardUnit.id));
        return;
    }

    const updatedUnit = getUnitUpdatedByTransportPrediction(selectedUnit, queue);

    const canCast = moveAbility.canCast(updatedUnit, hex, units, hexes);

    if (!canCast) {
        console.log("cant go there");
        return;
    }

    const tickNumber: number = yield select(tick);

    const movingActions = moveAbility.getActions(updatedUnit, hex, units, hexes, queue, tickNumber);

    for (const a of movingActions) {
        yield put(addAction(a));
        selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - CAST_TIME;
        yield put(updateUnit(selectedUnit));
    }

    yield put(selectAbility(null));
}

function* handleEffectSaga(reduxAction: ActionType<typeof actions.handleEffect>) {
    const action = reduxAction.payload as Action;
    const units: UnitsOnBoard = yield select(unitsOnBoard);
    const unit = Object.values(units).find(unit => unit.id === action.unitId) as Unit | null;
    if (unit) {
        const unitCoord = yield getCoordOfUnitForCurrentTick(unit);

        const coord = action.target[0].coord;
        const currentTick = yield select(tick);
        const effects = yield select(getEffectsByTick(currentTick));

        if (coord) {
            if (isInRange(unitCoord, coord, CAST_RANGE)) {
                const effect: Effect = {
                    type: EffectType.TRANSPORT,
                    sourceUnitId: unit.id,
                    effectId: action.actionId,
                    ability: ABILITIES.MOVE,
                    targetAndValue: [{ id: unit.id }, { coord }],
                };

                let alreadyOccupied = false;

                if (effects) {
                    const transportEffects = effects.filter((effect: Effect) => {
                        return effect.type === EffectType.TRANSPORT;
                    });

                    alreadyOccupied = transportEffects.reduce((occupied: boolean, effect: Effect) => {
                        if (occupied) return occupied;
                        const [, value] = effect.targetAndValue as UnitTargetAndValue;
                        if (value.coord) {
                            return isSameCoord(value.coord, coord);
                        }
                        return false;
                    }, alreadyOccupied);
                }

                if (alreadyOccupied) {
                    console.log("FIZZLE! Already occupied");
                } else {
                    yield put(
                        addEffect({
                            tick: action.tickStart + DELAY,
                            effect: effect,
                        }),
                    );

                    const animation: UnitTransportAnimation = {
                        animationId: action.actionId,
                        targetUnitId: unit.id,
                        departure: unitCoord,
                        destination: coord,
                        ability: ABILITIES.MOVE,
                        type: AnimationsTypes.UNIT_TRANSPORT,
                        tick: action.tickStart,
                    };

                    yield put(
                        addAnimation({
                            tick: action.tickStart,
                            animation,
                        }),
                    );
                }
            } else {
                console.log("FIZZLE! Not enough range", unitCoord, coord);
            }
        }
    }

    yield put(actionComplete());
}

export default function* moveSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
    yield all([takeEvery(getType(actions.handleEffect), handleEffectSaga)]);
}
