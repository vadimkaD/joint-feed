import { BORDER_SIZE, CENTER_STEP, HEX_WIDTH } from "./Battlefield.constants";
import { Coord } from "../../core/Hexagons/hexagons.types";

export function getCenter(hexNumber: number, lineNumber: number): Coord {
    return {
        x:
            lineNumber % 2
                ? HEX_WIDTH * (hexNumber + 1) - HEX_WIDTH / 2 + BORDER_SIZE
                : HEX_WIDTH * (hexNumber + 1) + BORDER_SIZE,
        y: lineNumber === 0 ? CENTER_STEP * 2 : CENTER_STEP * 2 + CENTER_STEP * 3 * lineNumber,
    };
}

export function getHexCoords(center: Coord, size: number): Coord[] {
    const result: Coord[] = [];

    for (let i = 0; i < 6; i++) {
        const angleDeg = 60 * i - 30;
        const angleRad = (Math.PI / 180) * angleDeg;
        result.push({
            x: Math.floor(center.x + size * Math.cos(angleRad)),
            y: Math.floor(center.y + size * Math.sin(angleRad)),
        });
    }
    return result;
}

export function getPointsFromCoords(coords: Coord[]): string {
    return coords.map(coord => `${coord.x} ${coord.y}`).join(" ");
}
