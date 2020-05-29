import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import BattleView from "./Battle.view";
import { addUnit } from "../BattleUnits/__redux/BattleUnits.actions";
import { ACTION_POINTS } from "../../core/Battle/Battle.constants";
import { FORM_FACTORS } from "../Battlefield/Units/Units.constants";
import { Owner } from "../../core/Battle/Unit.types";
import { ABILITIES } from "../../core/Abilities/Abilities.constants";

const Battle: React.FunctionComponent<{}> = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            addUnit({
                id: "Elf",
                currentHp: 25,
                coord: { x: 0, y: 1 },
                owner: Owner.PLAYER,
                currentActionPoints: ACTION_POINTS,
                maxHp: 25,
                damage: 7,
                abilities: [ABILITIES.MOVE, ABILITIES.MAGIC_ARROW],
                name: "Лучник",
                formFactor: FORM_FACTORS.ELF_VAMPIRE,
            }),
        );

        dispatch(
            addUnit({
                id: "Dwarf",
                currentHp: 25,
                coord: { x: 2, y: 1 },
                owner: Owner.PLAYER,
                currentActionPoints: ACTION_POINTS,
                maxHp: 25,
                damage: 7,
                abilities: [ABILITIES.MOVE],
                name: "Воин с топором",
                formFactor: FORM_FACTORS.DWARF_RULER,
            }),
        );

        dispatch(
            addUnit({
                id: "Imp",
                currentHp: 25,
                coord: { x: 7, y: 4 },
                owner: Owner.ENEMY,
                currentActionPoints: ACTION_POINTS,
                maxHp: 25,
                damage: 7,
                abilities: [ABILITIES.MOVE],
                name: "Имп",
                formFactor: FORM_FACTORS.IMP,
            }),
        );
    }, [dispatch]);

    return <BattleView />;
};

export default Battle;
