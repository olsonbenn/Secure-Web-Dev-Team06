import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

export default function Minesweeper() {
    /*const location = useLocation()
    const { props } = location.state
    const difficulty = props*/

    let WIDTH = 9;
    let HEIGHT = 9;
    let BOMBS = 10;

    /*console.log(props);
    if (difficulty == "easy") {        
        WIDTH = 9;
        HEIGHT = 9;
        BOMBS = 10;
    } else if (difficulty == "hard") {
        WIDTH = 30;
        HEIGHT = 16;
        BOMBS = 99;
    } else {
        WIDTH = 16;
        HEIGHT = 16;
        BOMBS = 40;
    }*/
    
    const [grid, setGrid] = useState(() => Array(HEIGHT).fill(0).map(() => Array(WIDTH).fill(0)));
    const [started, setStarted] = useState(false);
    const [ended, setEnded] = useState(false);
    const [time, setTime] = useState(0);
    const [flags, setFlags] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    
    useEffect(() => {
        setGrid(Array(HEIGHT).fill(0).map(() => Array(WIDTH).fill(0)));
    }, []);

    useEffect(() => {
        const overlay = document.getElementById("game-over-overlay");
        if (overlay) {
            overlay.style.display = ended ? "flex" : "none";
        }
    }, [ended]);

    useEffect(() => {
        let interval = null;

        if (started && !ended) {
            setTimerRunning(true);
            interval = setInterval(() => {
                setTime(t => t + 1);
            }, 1000);
        } else {
            setTimerRunning(false);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [started, ended]);



    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Reset Game
    function playAgain() {
        window.location.reload();
    }


    function setBombs() {
        setEnded(false);
        setStarted(true);
        let bombCount = BOMBS;
        setTime(0);
        while (bombCount > 0) {
            let randomHeight = getRandomInt(HEIGHT);
            let randomWidth = getRandomInt(WIDTH);
            if (grid[randomHeight][randomWidth] === 0) {
                grid[randomHeight][randomWidth] = 1;
                bombCount--;
            }
        }

        for (let h = 0; h < HEIGHT; h++) {
            let consoleString = "";
            for (let w = 0; w < WIDTH; w++) {
                consoleString += grid[w][h] + " ";
            }
            console.log(consoleString + "\n");
        }
        console.log(" ");
    }

    function flipSquare(row, col) {
        if (!started || ended) return;

        let cell = document.getElementById((row + 1) + (col * 9));

        if (grid[row][col] === 0) {
            grid[row][col] = 2;
            let nearbyBombs = 0;

            for (let h = 0; h <= 2; h++) {
                for (let w = 0; w <= 2; w++) {
                    if (!(row + w - 1 < 0 || row + w - 1 >= WIDTH || col + h - 1 < 0 || col + h - 1 > HEIGHT)) {
                        console.log(row + w - 1);
                        if (grid[row + w - 1][col + h - 1] == 1) {
                            nearbyBombs += 1;
                        }
                    }
                }
            }
            cell.innerHTML = nearbyBombs;
            cell.style.backgroundColor = "#ccc";
            if (nearbyBombs === 0) {
                for (let h = 0; h <= 2; h++) {
                    for (let w = 0; w <= 2; w++) {
                        if (!(row + w - 1 < 0 || row + w - 1 >= WIDTH || col + h - 1 < 0 || col + h - 1 > HEIGHT)) {
                            flipSquare(row + w - 1, col + h - 1);
                        }
                    }
                }
            }

            for (let h = 0; h < HEIGHT; h++) {
                let consoleString = "";
                for (let w = 0; w < WIDTH; w++) {
                    consoleString += grid[w][h] + " ";
                }
                console.log(consoleString + "\n");
            }
            console.log(" ");

        } else if (grid[row][col] === 1) {
            cell.style.backgroundColor = "#C00";
            setEnded(true);
            setStarted(false);
        }
    }

    function flag(row, col) {
        let cell = document.getElementById((row + 1) + (col * 9));
        console.log(cell.innerHTML);
        if (cell.innerHTML === "X") {
            setFlags(flags-1)
            cell.innerHTML = "";
        } else if (cell.innerHTML === "") {
            setFlags(flags+1)
            cell.innerHTML = "X"
        }
    }

    // Game over screen
    const gameOverOverlay = (
        <div id="game-over-overlay" className="game-over-overlay">
            <div className="game-over-card">
                <div className="game-over-title">Game Over</div>

                <button className="game-over-button" onClick={playAgain}>
                    Play Again
                </button>
            </div>
        </div>
    );



    return (
        <>
            {gameOverOverlay}

            <div className="text-center" onContextMenu={(e)=> e.preventDefault()}>
                <h1>Minesweeper</h1>
                <h2 id="status" className="mb-4"></h2>
                <div>
                    <div>
                        Bombs left: {10 - flags}
                    </div>
                    <div className="minesweeper-timer">
                        Time: {time}s
                    </div>
                </div>



                <div id="board" className="minesweeper-board mx-auto" style={{ width: WIDTH * 50 }}>
                    {/* render rows top-down; clicking any cell triggers drop in its column */}
                    {grid.map((row, rIdx) => (
                        <div className="minesweeper-row" key={rIdx} style={{ display: "grid", gridTemplateColumns: `repeat(${WIDTH}, 1fr)` }}>
                            {row.map((cell, cIdx) => (
                                <div
                                    key={cIdx}
                                    className="minesweeper-cell"
                                    id={(cIdx + 1) + (rIdx * 9)}
                                    onClick={() => flipSquare(cIdx, rIdx)}
                                    onContextMenu={() => flag(cIdx, rIdx)}
                                    role="button"
                                >
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button id="start" className="btn btn-primary mt-4" onClick={setBombs}>Start </button>
            </div>
        </>
    );
}