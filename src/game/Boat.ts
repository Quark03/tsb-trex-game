import boatImg from "../assets/boat.png";
import { TILE_SIZE } from "../utils/constants";

class Boat {

    private readonly POS_TOP = TILE_SIZE * 3;
    private readonly POS_BOTTOM = TILE_SIZE * 8;

    private readonly TILT_ANGLE = Math.PI / 10;

    private readonly SPEED = 1000;

    private _ctx: CanvasRenderingContext2D;
    private _img = new Image();

    private readonly x: number = TILE_SIZE * 3;
    private y: number = this.POS_TOP;
    private targetY: number = this.POS_TOP;
    private tiltAngle = 0;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this._img.src = boatImg;
        this._img.style.width = `${TILE_SIZE}px`;
        this._img.style.transform = "rotate(90deg)";
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    goTop() {
        this.targetY = this.POS_TOP
    }

    goBottom() {
        this.targetY = this.POS_BOTTOM
    }

    switchPlaces() {
        if (this.targetY === this.POS_TOP) {
            this.goBottom();
        } else {
            this.goTop();
        }
    }

    render(delta: number) {
        if (this.y < this.targetY) {
            this.y += this.SPEED * delta;
            this.tiltAngle = this.TILT_ANGLE;
            if (this.y > this.targetY) {
                this.tiltAngle = 0;
                this.y = this.targetY;
            }
        } else if (this.y > this.targetY) {
            this.y -= this.SPEED * delta;
            this.tiltAngle = -this.TILT_ANGLE;
            if (this.y < this.targetY) {
                this.tiltAngle = 0;
                this.y = this.targetY;
            }
        }

        this.drawRotatedAndResizedImage(this.x, this.y, Math.PI / 2);
    }

    private drawRotatedAndResizedImage(gridX: number, gridY: number, angle: number) {
        const gridSize = 32;         // Size of each grid cell
        const desiredHeight = gridSize * 3;  // Boat height spanning 3 grid cells (96px)

        const scale = desiredHeight / this._img.height;
        const scaledWidth = this._img.width * scale;
        const scaledHeight = this._img.height * scale;

        // Calculate the center of the grid cell where we want to place the boat
        const x = gridX + gridSize / 2;
        const y = gridY + desiredHeight / 2;
        // Save the current context state
        this._ctx.save();

        // Move the context origin to the boat's center position on the grid
        this._ctx.translate(x, y);

        // Rotate the context to the specified angle (in radians)
        this._ctx.rotate(angle + this.tiltAngle);

        // Draw the image centered at (0, 0) with the scaled size
        this._ctx.drawImage(this._img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);

        // Restore the context to avoid affecting other drawings
        this._ctx.restore();
    }
}

export default Boat