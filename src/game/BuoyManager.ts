import Boat from "./Boat";
import Buoy from "./Buoy";

class BuoyManager {

    private buoys: Buoy[];
    private _ctx: CanvasRenderingContext2D;

    private _speed = 100;
    private _spawnRate = 2; // 1 per second

    private timeSinceSpawn = 0;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this.buoys = [];
    }

    checkCollisions(boat: Boat) {
        return this.buoys.some(buoy => buoy.isColliding(boat));
    }

    update(delta: number) {
        let points = 0;

        // Remove buoys that are out of screen to save memory
        this.buoys = this.buoys.filter(buoy => {

            const isOut = buoy.isOutOfScreen()
            points += isOut ? 1 : 0;

            return !isOut;
        });

        // Update buoys positions
        this.buoys.forEach(buoy => buoy.update(delta, this._speed));

        // Spawn new buoy at the spawn rate
        if (this.timeSinceSpawn > this._spawnRate) {
            this.spawnBuoy();
            this.timeSinceSpawn = 0;
        }

        this.timeSinceSpawn += delta;
        return points;
    }

    render() {
        this.buoys.forEach(buoy => buoy.render());
    }

    private spawnBuoy() {
        if (Math.random() > 0.5) {
            this.buoys.push(new Buoy(this._ctx, "red"));
        } else {
            this.buoys.push(new Buoy(this._ctx, "green"));
        }
    }
}

export default BuoyManager;