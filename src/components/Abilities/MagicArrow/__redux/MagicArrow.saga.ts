import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import { v4 as uuidv4 } from "uuid";
import * as actions from "./MagicArrow.actions";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { actionComplete } from "../../../Battle/__redux/Battle.actions";
import { CAST_RANGE, CAST_TIME, DELAY } from "../MagicArrow.constants";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { getCoordOfUnitForCurrentTick } from "../../Abilities.saga";
import { addEffect } from "../../../Effects/__redux/Effects.actions";
import { addAnimation } from "../../../Animations/__redux/Animations.actions";
import { isInRange } from "../../../../core/Hexagons";
import { updateUnit } from "../../../BattleUnits/__redux/BattleUnits.actions";
import { selectedUnit as unit } from "../../../SelectedUnit/__redux/SelectedUnit.selectors";
import { selectAbility } from "../../../SelectedAbility/__redux/SelectedAbility.actions";
import { Effect, EffectType } from "../../../../core/Battle/Battle.types";
import { ACTION_POINTS } from "../../../../core/Battle/Battle.constants";
import { Unit, UnitsOnBoard } from "../../../../core/Battle/Unit.types";
import { Coord } from "../../../../core/Battle/Hexagon.types";
import { Action, AtLeastOneProjectileActionTarget } from "../../../../core/Actions/Actions.types";
import { ABILITIES } from "../../../../core/Battle/Abilities.constants";
import { AnimationsTypes, ProjectileAnimation } from "../../../../core/Animations/Animations.types";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    console.log("hexClickSaga", hex);
    const selectedUnit: Unit = { ...(yield select(unit)) };

    if (selectedUnit.currentActionPoints < CAST_TIME) {
        console.log("You cant cast it - not enough points");
        return;
    }

    const tickNumber: number = yield select(tick);

    const actionId = uuidv4();
    for (let i = 0; i < CAST_TIME; i++) {
        const target: AtLeastOneProjectileActionTarget = [{ coord: hex.coord }];

        yield put(
            addAction({
                tickStart: tickNumber + (ACTION_POINTS - selectedUnit.currentActionPoints),
                actionId: actionId,
                unitId: selectedUnit.id,
                target,
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
    const units: UnitsOnBoard = yield select(unitsOnBoard);
    const unit = Object.values(units).find(unit => unit.id === action.unitId) as Unit | null;

    if (unit) {
        const unitCoord = yield getCoordOfUnitForCurrentTick(unit);

        const coord: Coord = action.target[0].coord;
        if (coord) {
            if (isInRange(unitCoord, coord, CAST_RANGE)) {
                const effect: Effect = {
                    type: EffectType.DAMAGE_AND_HEX_EFFECT,
                    sourceUnitId: unit.id,
                    effectId: action.actionId,
                    ability: ABILITIES.MAGIC_ARROW,
                    targetAndValue: [{ coord: coord }, { currentHp: -unit.damage }],
                };

                yield put(
                    addEffect({
                        tick: action.tickStart + DELAY,
                        effect: effect,
                    }),
                );

                const animation: ProjectileAnimation = {
                    animationId: action.actionId,
                    departure: unitCoord,
                    destination: coord,
                    ability: ABILITIES.MAGIC_ARROW,
                    type: AnimationsTypes.PROJECTILE,
                    tick: action.tickStart,
                };

                yield put(
                    addAnimation({
                        tick: action.tickStart,
                        animation,
                    }),
                );
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
