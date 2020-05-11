import React from "react";
import { CenterProps } from "./Battlefield.types";
import { HighlightPolygon, SelectedUnitPolygon } from "./Battlefield.styled";
import { HEX_SIZE, Highlight } from "./Battlefield.constants";
import { getHexCoords, getPointsFromCoords } from "./Battlefield.utils";
import { Move } from "../Abilities/Move/Move.highlight";
import { MagicArrow } from "../Abilities/MagicArrow/MagicArrow.highlight";

type Highlights = {
    [key in Highlight]: HighlightComponent;
};

function MagicArrowHiglight(props: CenterProps) {
    return <MagicArrow center={props.center} />;
}

function MoveHighlight(props: CenterProps) {
    return <Move center={props.center} />;
}

function SelectedUnitHighlight(props: CenterProps) {
    const points = getPointsFromCoords(getHexCoords(props.center, HEX_SIZE));
    return <SelectedUnitPolygon points={points} />;
}

function HoverHightlight(props: CenterProps) {
    const points = getPointsFromCoords(getHexCoords(props.center, HEX_SIZE));
    return <HighlightPolygon points={points} />;
}

type HighlightComponent = (props: CenterProps) => React.ReactElement;

//TODO: развязать battlefield и highlights
export const getHighlightComponent: Highlights = {
    [Highlight.MOVE]: MoveHighlight,
    [Highlight.SELECTED_UNIT]: SelectedUnitHighlight,
    [Highlight.HOVER]: HoverHightlight,
    [Highlight.MAGIC_ARROW]: MagicArrowHiglight,
};
