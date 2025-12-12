import React, { useEffect, useState } from "react";

const WIDTH = 9;
const HEIGHT = 9;
const BOMBS = 10;

export default function Minesweeper() {
    const [grid, setGrid] = useState(() => Array(HEIGHT).fill(0).map(()=>Array(WIDTH).fill(0)));
    const [started, setStarted] = useState(false);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        setGrid(Array(HEIGHT).fill(0).map(()=>Array(WIDTH).fill(0)));
    }, []);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function setBombs() {
        setEnded(false);
        setStarted(true);
        let bombCount = BOMBS;
        while(bombCount > 0) {
            let randomHeight = getRandomInt(HEIGHT);
            let randomWidth = getRandomInt(WIDTH);
            if (grid[randomHeight][randomWidth] === 0) {
                grid[randomHeight][randomWidth] = 1;
                bombCount--;
            }
        }
    }

    function flipSquare(row, col) {
    if (!started || ended) return;
    // find bottom-most empty row in this column
      if (grid[row][col] === 0) {
        grid[row][col] = 2;
        let cell = document.getElementById((row+1) + (col*9));
        let nearbyBombs = 0;

        for(let h = 0; h <= 2; h++) { 
            for(let w = 0; w <= 2; w++) {
                if(!(row-w-1 < 0 || row-w-1 > WIDTH || col-h-1 < 0 || col-h-1 > HEIGHT)) {
                    if (grid[row-w-1][col-h-1] == 1) {
                        nearbyBombs += 1;
                    }
                }
            }
        }
        cell.innerHTML = nearbyBombs;

        for(let h = 0; h < HEIGHT; h++) { 
            let consoleString = "";
            for(let w = 0; w < WIDTH; w++) {
                consoleString += grid[w][h] + " ";
            }
            console.log(consoleString + "\n");
        }
        console.log(" ")

      } else if (grid[r][col] === 1) {
        setEnded(true);
        setStarted(false);
      }
    // column full — ignore
  }
      return (
    <div className="text-center">
      <h1>Minesweeper</h1>
      <h2 id="status" className="mb-4"></h2>

      <div id="board" className="minesweeper-board mx-auto" style={{ width: WIDTH * 75 }}>
        {/* render rows top-down; clicking any cell triggers drop in its column */}
        {grid.map((row, rIdx) => (
          <div className="minesweeper-row" key={rIdx} style={{ display: "grid", gridTemplateColumns: `repeat(${WIDTH}, 1fr)` }}>
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                className="minesweeper-cell"
                id={(cIdx+1) + (rIdx*9)}
                onClick={() => flipSquare(cIdx, rIdx)}
                role="button"
              >
              </div>
            ))}
          </div>
        ))}
      </div>
      <button id="start" className="btn btn-primary mt-4" onClick={setBombs}>
      </button>
    </div>
  );
}