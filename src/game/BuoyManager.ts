import Buoy from "./Buoy";

class BuoyManager {

    private buoys: Buoy[];
    private _ctx: CanvasRenderingContext2D;

    private _speed = 100;
    private _spawnRate = 1; // 1 per second

    private timeSinceSpawn = 0;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this.buoys = [];
    }

    update(delta: number) {
        // Remove buoys that are out of screen to save memory
        this.buoys = this.buoys.filter(buoy => !buoy.isOutOfScreen());

        // Update buoys positions
        this.buoys.forEach(buoy => buoy.update(delta, this._speed));

        // Spawn new buoy at the spawn rate
        if (this.timeSinceSpawn > 1000) {
            this.spawnBuoy();
            this.timeSinceSpawn = 0;
        }

        this.timeSinceSpawn += delta;
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