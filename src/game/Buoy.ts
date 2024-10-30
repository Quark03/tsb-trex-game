import { MAP_WIDTH, TILE_SIZE } from "../utils/constants";

import redBuoy from "../assets/buoys/red-buoy.png";
import greenBuoy from "../assets/buoys/green-buoy.png";


class Buoy {

    private readonly POS_TOP = TILE_SIZE * 3;
    private readonly POS_BOTTOM = TILE_SIZE * 8;

    private _ctx: CanvasRenderingContext2D;
    private _img = new Image();
    private _type: "red" | "green";

    private x: number = MAP_WIDTH;
    private y: number;

    constructor(ctx: CanvasRenderingContext2D, type: "red" | "green") {
        this._ctx = ctx;
        this._type = type;
        this._img.src = this._type === "red" ? redBuoy : greenBuoy;
        this.y = this._type === "red" ? this.POS_TOP : this.POS_BOTTOM;
    }

    update(delta: number, speed: number) {
        this.x -= speed * delta;
    }

    isOutOfScreen() {
        return this.x < - TILE_SIZE * 2;
    }

    render() {
        this._ctx.drawImage(this._img, this.x, this.y, TILE_SIZE * 2, TILE_SIZE * 2);
    }
}

export default Buoy;