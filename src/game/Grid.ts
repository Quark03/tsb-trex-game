import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from "../utils/constants";

class Grid {
    private _ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    render() {
        this._ctx.strokeStyle = "#000";
        this._ctx.lineWidth = 1;

        for (let x = 0; x < MAP_WIDTH; x += TILE_SIZE) {
            this._ctx.beginPath();
            this._ctx.moveTo(x, 0);
            this._ctx.lineTo(x, this._ctx.canvas.height);
            this._ctx.stroke();
        }

        for (let y = 0; y < MAP_HEIGHT; y += TILE_SIZE) {
            this._ctx.beginPath();
            this._ctx.moveTo(0, y);
            this._ctx.lineTo(this._ctx.canvas.width, y);
            this._ctx.stroke();
        }
    }
}

export default Grid;