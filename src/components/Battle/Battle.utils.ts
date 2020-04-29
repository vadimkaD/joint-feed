import { WIDTH, HEIGHT } from "./Battle.constants";
import { Coord, Hex, PreparedUnit } from "./Battle.types";

export function getCoordsFromString(coord: string): Coord {
    const [x, y] = coord.split(":").map(v => +v);
    return { x, y };
}

export function getStringFromCoord(coord: Coord): string {
    return `${coord.x}:${coord.y}`;
}

function getLeftTop(coord: Coord): Coord | null {
    if (coord.y > 0 && !(coord.x === 0 && coord.y % 2)) {
        return { x: coord.y % 2 ? coord.x - 1 : coord.x, y: coord.y - 1 };
    }
    return null;
}

function getRightTop(coord: Coord): Coord | null {
    if (coord.y > 0 && !(coord.x === WIDTH - 1)) {
        return { x: coord.y % 2 ? coord.x : coord.x + 1, y: coord.y - 1 };
    }
    return null;
}

export function getAllNearCoords(coord: Coord): Coord[] {
    const result: Coord[] = [];
    const leftTop = getLeftTop(coord);
    const rightTop = getRightTop(coord);
    let right: Coord;
    let rightBottom: Coord;
    let leftBottom: Coord;
    let left: Coord;

    leftTop && result.push(leftTop);
    rightTop && result.push(rightTop);

    if (coord.x > 0) {
        left = { x: coord.x - 1, y: coord.y };
        result.push(left);
    }

    if (coord.x < WIDTH - 1 && !(coord.x === WIDTH - 2 && !(coord.y % 2))) {
        right = { x: coord.x + 1, y: coord.y };
        result.push(right);
    }

    if (coord.x < WIDTH - 2 && coord.y < HEIGHT - 1) {
        rightBottom = { x: coord.y % 2 ? coord.x : coord.x + 1, y: coord.y + 1 };
        result.push(rightBottom);
    }

    if (coord.y < HEIGHT - 1 && !(coord.x === 0 && coord.y % 2)) {
        leftBottom = { x: coord.y % 2 ? coord.x - 1 : coord.x, y: coord.y + 1 };
        result.push(leftBottom);
    }
    return result;
}

export function getAreaCoords(radius: number, coord: Coord): Coord[] {
    if (radius < 0) return [];

    if (radius === 0) {
        return [coord];
    }

    if (radius === 1) {
        return [...getAllNearCoords(coord), coord];
    }

    if (radius > 1) {
        const nearCoords = getAllNearCoords(coord);
        const areaCoords: Coord[] = nearCoords.map(coord => getAreaCoords(radius - 1, coord)).flat();
        return [...new Set(areaCoords.map(coord => getStringFromCoord(coord)))].map(c => getCoordsFromString(c));
    }

    return [];
}

export function getUnitInHexOrNull(hex: Hex, units: PreparedUnit[]): PreparedUnit | null {
    const unit = units.find(unit => unit.y === hex.y && unit.x === hex.x) as PreparedUnit;
    return unit ? unit : null;
}
