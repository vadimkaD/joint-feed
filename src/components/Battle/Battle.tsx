import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import BattleView from "./Battle.view";
import { Owner } from "./Battle.types";
import { ACTION_POINTS } from "./Battle.constants";
import { addUnit } from "../BattleUnits/__redux/BattleUnits.actions";
import { ABILITIES } from "../Abilities/Abilities.constants";

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
                image: "/images/units/sprites/Elf_Vampire.png",
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
                image: "/images/units/sprites/Dwarf_Ruler.png",
            }),
        );
    }, [dispatch]);

    return <BattleView />;
};

export default Battle;
