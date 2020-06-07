import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import BattleView from "./Battle.view";
import { addUnit } from "../BattleUnits/__redux/BattleUnits.actions";
import { ACTION_POINTS } from "../../core/Battle/Battle.constants";
import { FORM_FACTORS } from "../Battlefield/Units/Units.constants";
import { Owner } from "../../core/Battle/Unit.types";
import { ABILITIES } from "../../core/Battle/Abilities.constants";
import { setPlayer } from "../Player/__redux/Player.actions";
import { connectPlayer } from "./__redux/Battle.actions";

const Battle: React.FunctionComponent<{}> = props => {
    const dispatch = useDispatch();
    const params = useParams<{ player: "string" }>();
    console.log("params", params);

    useEffect(() => {
        if (params.player && Object.values(Owner).includes(params.player as Owner)) {
            dispatch(setPlayer(params.player as Owner));
            dispatch(connectPlayer(params.player as Owner));
        }
    }, [dispatch, params.player]);

    useEffect(() => {
        dispatch(
            addUnit({
                id: "Elf",
                currentHp: 25,
                coord: { x: 0, y: 1 },
                owner: Owner.RED,
                currentActionPoints: ACTION_POINTS,
                maxHp: 25,
                damage: 7,
                abilities: [ABILITIES.MOVE, ABILITIES.MAGIC_ARROW],
                name: "Лучник",
                formFactor: FORM_FACTORS.ELF_VAMPIRE,
                isDead: false,
            }),
        );

        dispatch(
            addUnit({
                id: "Dwarf",
                currentHp: 25,
                coord: { x: 2, y: 1 },
                owner: Owner.RED,
                currentActionPoints: ACTION_POINTS,
                maxHp: 25,
                damage: 7,
                abilities: [ABILITIES.MOVE, ABILITIES.MAGIC_ARROW],
                name: "Воин с топором",
                formFactor: FORM_FACTORS.DWARF_RULER,
                isDead: false,
            }),
        );

        dispatch(
            addUnit({
                id: "Imp",
                currentHp: 25,
                coord: { x: 9, y: 2 },
                owner: Owner.GREEN,
                currentActionPoints: ACTION_POINTS,
                maxHp: 25,
                damage: 7,
                abilities: [ABILITIES.MOVE, ABILITIES.MAGIC_ARROW],
                name: "Имп",
                formFactor: FORM_FACTORS.IMP,
                isDead: false,
            }),
        );

        dispatch(
            addUnit({
                id: "NorthernHuman",
                currentHp: 25,
                coord: { x: 10, y: 6 },
                owner: Owner.GREEN,
                currentActionPoints: ACTION_POINTS,
                maxHp: 25,
                damage: 7,
                abilities: [ABILITIES.MOVE, ABILITIES.MAGIC_ARROW],
                name: "Северный человек",
                formFactor: FORM_FACTORS.NORTHERN_HUMAN,
                isDead: false,
            }),
        );
    }, [dispatch]);

    return <BattleView />;
};

export default Battle;
