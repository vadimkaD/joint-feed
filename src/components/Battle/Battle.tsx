import React, { useEffect } from "react";
import { connect } from "react-redux";
import BattleView from "./Battle.view";
import { BattleProps, BattleState, Owner } from "./Battle.types";
import { Dispatch } from "redux";
import { selectUnit } from "../InfoPanel/__redux/InfoPanel.actions";
import { InfoPanelState } from "../InfoPanel/InfoPanel.types";
import { highlightedHexes, playerUnitsOnBoard, unitsOnBoard } from "./__redux/Battle.selectors";
import { mouseLeaveBoard } from "./__redux/Battle.actions";
import { ACTION_POINTS } from "./Battle.constants";
import { AbilitiesState } from "../Abilities/Abilities.types";
import { isAnimation } from "./__redux/Battle.external-selectors";
import { playerActions } from "../ActionQueue/__redux/ActionQueue.selectors";
import { ActionQueueState } from "../ActionQueue/ActionQueue.types";
import { queue } from "../ActionQueue/__redux/ActionQueue.external-selectors";
import { Hex, HexesState } from "../Hexes/Hexes.types";
import { hexes } from "../Hexes/__redux/Hexes.selectors";
import { clickHex, mouseEnterHex } from "../Hexes/__redux/Hexes.actions";
import { BattleUnit, BattleUnitsState } from "../BattleUnits/BattleUnits.types";
import { battleUnits } from "../BattleUnits/__redux/BattleUnits.selectors";
import { addUnit } from "../BattleUnits/__redux/BattleUnits.actions";
import { ABILITIES } from "../Abilities/Abilities.constants";

function Battle(props: BattleProps) {
    const {
        battleUnits,
        hexes,
        onHexClick,
        onMouseEnterHex,
        unitsOnBoard,
        highlightedHexes,
        addUnit,
        playerActions,
        playerUnitsOnBoard,
        mouseLeaveBoard,
        queue,
        isAnimation,
    } = props;

    useEffect(() => {
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
        });

        addUnit({
            id: "Dwarf",
            currentHp: 25,
            coord: { x: 12, y: 3 },
            owner: Owner.PLAYER,
            currentActionPoints: ACTION_POINTS,
            maxHp: 25,
            damage: 7,
            abilities: [ABILITIES.MOVE],
            name: "Воин с топором",
            image: "/images/units/sprites/Dwarf_Ruler.png",
        });
    }, [addUnit]);

    return (
        <BattleView
            isAnimation={isAnimation}
            onMouseEnterHex={onMouseEnterHex}
            hexes={hexes}
            unitsOnBoard={unitsOnBoard}
            highlightedHexes={highlightedHexes}
            battleUnits={battleUnits}
            onHexClick={onHexClick}
            playerActions={playerActions}
            playerUnitsOnBoard={playerUnitsOnBoard}
            mouseLeaveBoard={mouseLeaveBoard}
            queue={queue}
        />
    );
}

const mapStateToProps = (
    state: BattleUnitsState & BattleState & HexesState & InfoPanelState & AbilitiesState & ActionQueueState,
) => ({
    battleUnits: battleUnits(state),
    hexes: hexes(state),
    unitsOnBoard: unitsOnBoard(state),
    highlightedHexes: highlightedHexes(state),
    playerActions: playerActions(state),
    playerUnitsOnBoard: playerUnitsOnBoard(state),
    queue: queue(state),
    isAnimation: isAnimation(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectUnit: (unitId: string | null) => dispatch(selectUnit(unitId)),
        addUnit: (unit: BattleUnit) => dispatch(addUnit(unit)),
        onHexClick: (hex: Hex) => dispatch(clickHex(hex)),
        onMouseEnterHex: (hex: Hex) => dispatch(mouseEnterHex(hex)),
        mouseLeaveBoard: () => dispatch(mouseLeaveBoard()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
