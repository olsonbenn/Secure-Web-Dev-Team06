import React, { useEffect, useState } from "react";

/**
 * Connect4: grid 7 (width) x 6 (height)
 * We'll render clickable cells but handle dropping to lowest empty in a column.
 * Use CSS discs for pieces (local images optional).
 */

const WIDTH = 7;
const HEIGHT = 6;

export default function Connect4() {
  const [grid, setGrid] = useState(() => Array(HEIGHT).fill(null).map(()=>Array(WIDTH).fill(0)));
  const [player, setPlayer] = useState(1);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("Waiting for game to start");
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setGrid(Array(HEIGHT).fill(null).map(()=>Array(WIDTH).fill(0)));
  }, []);

  function startReset() {
    if (!started && !ended) {
      setStarted(true);
      setPlayer(1);
      setStatus("Player 1's turn");
    } else {
      // reset
      setGrid(Array(HEIGHT).fill(null).map(()=>Array(WIDTH).fill(0)));
      setStarted(false);
      setEnded(false);
      setPlayer(1);
      setStatus("Waiting for game to start");
    }
  }

  function dropPiece(col) {
    if (!started || ended) return;
    // find bottom-most empty row in this column
    for (let r = HEIGHT - 1; r >= 0; r--) {
      if (grid[r][col] === 0) {
        const newGrid = grid.map(row => row.slice());
        newGrid[r][col] = player;
        setGrid(newGrid);
        if (detectWin(newGrid, r, col, player)) {
          setStatus(`Player ${player} has won!`);
          setEnded(true);
          setStarted(false);
        } else {
          const next = player === 1 ? 2 : 1;
          setPlayer(next);
          setStatus(`Player ${next}'s turn`);
        }
        return;
      }
    }
    // column full — ignore
  }

  function detectWin(g, row, col, pl) {
    // check 4 directions from the last-placed piece (horizontal, vertical, diag1, diag2)
    const directions = [
      {dr:0, dc:1}, // horizontal
      {dr:1, dc:0}, // vertical
      {dr:1, dc:1}, // diag down-right
      {dr:1, dc:-1} // diag down-left
    ];

    for (let {dr, dc} of directions) {
      let count = 1;
      // forward
      for (let step = 1; step < 4; step++) {
        const r = row + dr*step;
        const c = col + dc*step;
        if (r < 0 || r >= HEIGHT || c < 0 || c >= WIDTH) break;
        if (g[r][c] === pl) count++; else break;
      }
      // backward
      for (let step = 1; step < 4; step++) {
        const r = row - dr*step;
        const c = col - dc*step;
        if (r < 0 || r >= HEIGHT || c < 0 || c >= WIDTH) break;
        if (g[r][c] === pl) count++; else break;
      }
      if (count >= 4) return true;
    }
    return false;
  }

  return (
    <div className="text-center">
      <h1>Connect 4</h1>
      <h2 id="status" className="mb-4">{status}</h2>

      <div id="board" className="connect4-board mx-auto" style={{ width: WIDTH * 75 }}>
        {/* render rows top-down; clicking any cell triggers drop in its column */}
        {grid.map((row, rIdx) => (
          <div className="connect4-row" key={rIdx} style={{ display: "grid", gridTemplateColumns: `repeat(${WIDTH}, 1fr)` }}>
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                className="connect4-cell"
                onClick={() => dropPiece(cIdx)}
                role="button"
                aria-label={`cell-${rIdx}-${cIdx}`}
              >
                <div className={"disc " + (cell === 1 ? "red" : cell === 2 ? "blue" : "")}></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button id="start" className="btn btn-primary mt-4" onClick={startReset}>
        {(!started && !ended) ? "Start Game" : (!started && ended ? "Start Game" : "Reset")}
      </button>
    </div>
  );
}
