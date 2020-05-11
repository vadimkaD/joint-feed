import React from "react";
import { CenterProps } from "../../Battlefield/Battlefield.types";
import { HighlightImage } from "../../Battlefield/Battlefield.styled";
import { ICON_PATH } from "./MagicArrow.constants";

export function MagicArrow(props: CenterProps) {
    return (
        <HighlightImage width={60} height={60} xlinkHref={ICON_PATH} x={props.center.x - 30} y={props.center.y - 30} />
    );
}
