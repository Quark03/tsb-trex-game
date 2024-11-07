import React, { useEffect } from 'react'
import Boat from './game/Boat'
import { DEV_MODE, MAP_HEIGHT, MAP_WIDTH } from './utils/constants';
import World from './game/World';
import Grid from './game/Grid';
import BuoyManager from './game/BuoyManager';
import { FaArrowRotateRight } from 'react-icons/fa6';


function computeHighScore(score: number) {

    let currentMaxScore = parseInt(localStorage.getItem("max-score") || "0")
    if (!currentMaxScore) {
        localStorage.setItem("max-score", score.toString())
    }

    if (currentMaxScore && score > currentMaxScore) {
        localStorage.setItem("max-score", score + "")
    }

}


function Game() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [restart, setRestart] = React.useState(0);

    const handleRestart = () => {
        setRestart(c => c += 1);
        const resetBtn = document.getElementById("restart") as HTMLButtonElement;
        resetBtn.style.visibility = "hidden";
    }

    useEffect(() => {

        const resetBtn = document.getElementById("restart") as HTMLButtonElement;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const boat = new Boat(ctx);
        const world = new World(ctx);
        const grid = new Grid(ctx);
        const buoyManager = new BuoyManager(ctx);


        let lastTime = 0;
        let animatedFrameId: number;
        let score = 0;
        let gameOver = false;

        function handleKeyDown(event: KeyboardEvent) {
            switch (event.key) {
                case "ArrowUp":
                    console.log("ArrowUp");
                    boat.goTop();
                    break;
                case "ArrowDown":
                    console.log("ArrowDown");
                    boat.goBottom();
                    break;
                case " ":
                    console.log("Space");
                    boat.switchPlaces();
                    break;
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        const render = (timestamp: number) => {
            const delta = (timestamp - lastTime) / 1_000;
            lastTime = timestamp;

            console.log("State:", gameOver);
            if (gameOver) {
                console.log("Game Over");
                resetBtn.style.visibility = "visible";
                return;
            }

            score += buoyManager.update(delta, score);
            computeHighScore(score)
            gameOver = buoyManager.checkCollisions(boat);

            world.render(delta); // Render the world as background
            boat.render(delta);
            buoyManager.render();



            // Score
            ctx.fillStyle = "#000000";
            ctx.font = "24px Arial";
            const scoreText = `Score: ${score}`;
            const textMetrics = ctx.measureText(scoreText);
            ctx.fillText(`Score: ${score}`, (MAP_WIDTH - textMetrics.width) / 2, 40);

            // Current Max Score
            ctx.fillStyle = "#000000";
            ctx.font = "12px Arial"
            ctx.fillText(`Highest Score: ${localStorage.getItem("max-score") || 0}`, MAP_WIDTH - 150, 40)

            if (DEV_MODE) {
                ctx.fillStyle = "#ff0000";
                ctx.font = "16px Arial";
                ctx.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 20);
                grid.render();
            }

            animatedFrameId = window.requestAnimationFrame(render);
        }

        animatedFrameId = window.requestAnimationFrame(render);

        return () => {
            window.cancelAnimationFrame(animatedFrameId);
            window.removeEventListener("keydown", handleKeyDown);
            resetBtn.style.visibility = "hidden";
        }
    }, [restart])

    return (
        <>
            <canvas ref={canvasRef} width={MAP_WIDTH} height={MAP_HEIGHT} className="bg-blue-400" />

            <div className="mt-6">
                <button id="restart" style={{ visibility: 'hidden' }} className="text-4xl" onClick={() => handleRestart()}>
                    <FaArrowRotateRight />
                </button>
            </div>
        </>
    )
}

export default Game
