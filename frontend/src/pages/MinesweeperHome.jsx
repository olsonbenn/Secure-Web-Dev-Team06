
import Minesweeper from "./Minesweeper"

export default function MinesweeperHome() {
    let currentDifficulty = "medium";

    function setDifficulty(difficulty) {
        currentDifficulty = difficulty;
    }

    return (
        <div className="text-center">
            <h1>Minesweeper</h1>
            <h2 id="status" className="mb-4"></h2>
            <div>
                <button id="start" className="btn btn-primary mt-4" onClick={setDifficulty("easy")}>
                    Easy
                </button>
            </div>
            <div>
                <button id="start" className="btn btn-primary mt-4" onClick={setDifficulty("medium")}>
                    Medium
                </button>
            </div>
            <div>
                <button id="start" className="btn btn-primary mt-4" onClick={setDifficulty("hard")}>
                    Hard
                </button>
            </div>
            <div>
                <button id="start" className="btn btn-primary mt-4">
                    Leaderboard
                </button>
            </div>
            <div>
                <button id="start" className="btn btn-primary mt-4">
                    Start
                </button>
            </div>
        </div>
    );
}