import waterTile from "../assets/tiles/water.png";
import grassTile from "../assets/tiles/grass.png";
import shoreTop from "../assets/tiles/shore-top.png";
import shoreBottom from "../assets/tiles/shore-bottom.png";

import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from "../utils/constants";

class World {

    private _ctx: CanvasRenderingContext2D;

    private water_tile = new Image();
    private grass_tile = new Image();
    private shore_top = new Image();
    private shore_bottom = new Image();

    private GRASS_TILES = 2;
    private WATER_START: number;
    private WATER_END: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this.water_tile.src = waterTile;
        this.grass_tile.src = grassTile;
        this.shore_top.src = shoreTop;
        this.shore_bottom.src = shoreBottom;

        this.WATER_START = this.GRASS_TILES * TILE_SIZE;
        this.WATER_END = MAP_HEIGHT - (this.WATER_START + TILE_SIZE);

        console.log("Water start:", this.WATER_START);
        console.log("Water end:", this.WATER_END);
    }

    public render() {
        for (let y = 0; y < MAP_HEIGHT; y += TILE_SIZE) {
            for (let x = 0; x < MAP_WIDTH; x += TILE_SIZE) {
                this.renderTile(x, y);
            }
        }
    }

    private renderTile(x: number, y: number) {
        if (y < this.WATER_START) {
            this._ctx.drawImage(this.grass_tile, x, y);
        } else if (y == this.WATER_START) {
            this._ctx.drawImage(this.shore_top, x, y);
        } else if (y > this.WATER_END) {
            this._ctx.drawImage(this.grass_tile, x, y);
        } else if (y == this.WATER_END) {
            this._ctx.drawImage(this.shore_bottom, x, y);
        } else {
            this._ctx.drawImage(this.water_tile, x, y);
        }
    }
}

export default World;