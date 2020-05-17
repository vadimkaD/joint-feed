import { Coord, Cube, Coords } from "./hexagons.types";
import { HEIGHT, WIDTH } from "../components/Battlefield/Battlefield.constants";

export function getCoordsFromString(coord: string): Coord {
    const [x, y] = coord.split(":").map(v => +v);
    return { x, y };
}

export function getStringFromCoord(coord: Coord): string {
    return `${coord.x}:${coord.y}`;
}

export function isSameCoord(one: Coord, two: Coord) {
    return one.x === two.x && one.y === two.y;
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

function getLeft(coord: Coord): Coord | null {
    if (coord.x > 0) {
        return { x: coord.x - 1, y: coord.y };
    }

    return null;
}

function getRight(coord: Coord): Coord | null {
    if (coord.x < WIDTH - 1 && !(coord.x === WIDTH - 2 && !(coord.y % 2))) {
        return { x: coord.x + 1, y: coord.y };
    }
    return null;
}

function getRightBottom(coord: Coord): Coord | null {
    if (coord.x < WIDTH - 2 && coord.y < HEIGHT - 1) {
        return { x: coord.y % 2 ? coord.x : coord.x + 1, y: coord.y + 1 };
    }
    return null;
}

function getLeftBottom(coord: Coord): Coord | null {
    if (coord.y < HEIGHT - 1 && !(coord.x === 0 && coord.y % 2)) {
        return { x: coord.y % 2 ? coord.x - 1 : coord.x, y: coord.y + 1 };
    }
    return null;
}

export function getAllNearCoords(coord: Coord): Coord[] {
    const result: Coord[] = [];
    const leftTop = getLeftTop(coord);
    const rightTop = getRightTop(coord);
    const left = getLeft(coord);
    const right = getRight(coord);
    const rightBottom = getRightBottom(coord);
    const leftBottom = getLeftBottom(coord);

    leftTop && result.push(leftTop);
    rightTop && result.push(rightTop);
    left && result.push(left);
    right && result.push(right);
    rightBottom && result.push(rightBottom);
    leftBottom && result.push(leftBottom);

    return result;
}

export function evenrToCube(hex: Coord): Cube {
    const x = hex.x - (hex.y + (hex.y & 1)) / 2;
    const z = hex.y;
    const y = -x - z;
    return { x, y, z };
}

export function cubeToEvenr(cube: Cube): Coord {
    const col = cube.x + (cube.z + (cube.z & 1)) / 2;
    const row = cube.z;
    return { x: col, y: row };
}

function cubeDistance(a: Cube, b: Cube): number {
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function cubeLerp(a: Cube, b: Cube, t: number): Cube {
    return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) };
}

function cubeRound(cube: Cube) {
    let rx = Math.round(cube.x);
    let ry = Math.round(cube.y);
    let rz = Math.round(cube.z);

    const xDiff = Math.abs(rx - cube.x);
    const yDiff = Math.abs(ry - cube.y);
    const zDiff = Math.abs(rz - cube.z);

    if (xDiff > yDiff && xDiff > zDiff) {
        rx = -ry - rz;
    } else if (yDiff > zDiff) {
        ry = -rx - rz;
    } else {
        rz = -rx - ry;
    }

    return { x: rx, y: ry, z: rz };
}

function cubeLinedraw(a: Cube, b: Cube): Cube[] {
    const N = cubeDistance(a, b);
    const results = [];
    for (let i = 0; i <= N; i++) {
        results.push(cubeRound(cubeLerp(a, b, (1.0 / N) * i)));
    }
    return results;
}

export function getRoute(from: Coord, to: Coord): Coord[] {
    const fromCubeCoord = evenrToCube(from);
    const toCubeCoord = evenrToCube(to);
    return cubeLinedraw(fromCubeCoord, toCubeCoord)
        .map(cube => {
            return cubeToEvenr(cube);
        })
        .reverse();
}

export function offsetDistance(from: Coord, to: Coord): number {
    const ac = evenrToCube(from);
    const bc = evenrToCube(to);
    return cubeDistance(ac, bc);
}

export function coordArrToObj(coords: Coord[]): Coords {
    return coords.reduce((total: Coords, coord) => {
        total[getStringFromCoord(coord)] = coord;
        return total;
    }, {});
}

export function isInRange(coord: Coord, test: Coord, range: number): boolean {
    const allNear = getArea(coord, range);
    const obj = coordArrToObj(allNear);
    return !!obj[getStringFromCoord(test)];
}

export function cubeAdd(one: Cube, two: Cube): Cube {
    return { x: one.x + two.x, y: one.y + two.y, z: one.z + two.z };
}

export function getArea(coord: Coord, radius: number): Coord[] {
    const results: Coord[] = [];
    for (let x = -radius; x <= radius; x++) {
        for (let y = Math.max(-radius, -x - radius); y <= Math.min(radius, -x + radius); y++) {
            const z = -x - y;
            results.push(cubeToEvenr(cubeAdd(evenrToCube(coord), { z, x, y })));
        }
    }

    return results;
}
