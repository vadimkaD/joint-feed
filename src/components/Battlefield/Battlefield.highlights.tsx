import React from "react";
import { CenterProps, PolygonProps } from "./Battlefield.types";
import { HighlightImage, HighlightPolygon } from "./Battlefield.styled";

export function Hover(props: PolygonProps) {
    return <HighlightPolygon {...props} />;
}

export function Route(props: CenterProps) {
    return (
        <HighlightImage
            width={60}
            height={60}
            xlinkHref="/images/hexes/way/boot-print.png"
            x={props.center.x - 30}
            y={props.center.y - 30}
        />
    );
}
