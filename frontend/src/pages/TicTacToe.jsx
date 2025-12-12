import React, { useEffect, useState } from "react";

const DATA_URL = "https://olsonbenn.github.io/Secure-Web-Midterm-Project/Midterm/data.JSON";

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [current, setCurrent] = useState("X");
  const [status, setStatus] = useState("Player X's turn");
  const [gameActive, setGameActive] = useState(true);
  const [xImage, setXImage] = useState("");
  const [oImage, setOImage] = useState("");
  const [refreshImg, setRefreshImg] = useState("");

  useEffect(() => {
    fetch(DATA_URL)
      .then(r => r.json())
      .then(data => {
        const t = data.pages.ticTacToe || {};
        setXImage(t.playerX_piece || "");
        setOImage(t.playerO_piece || "");
        setRefreshImg(t.refresh || "");
      })
      .catch(() => {
        // ignore; will use text fallback
      });
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    setStatus(`Player ${current}'s turn`);
  }, [current, gameActive]);

  function handleClick(i) {
    if (!gameActive || board[i] !== "") return;
    const nextBoard = board.slice();
    nextBoard[i] = current;
    setBoard(nextBoard);
    // check win/draw
    const won = checkWin(nextBoard);
    if (won) {
      setStatus(`Player ${current} has won!`);
      setGameActive(false);
      return;
    }
    if (!nextBoard.includes("")) {
      setStatus("Game ended in a draw!");
      setGameActive(false);
      return;
    }
    setCurrent(prev => (prev === "X" ? "O" : "X"));
  }

  function checkWin(bd) {
    for (let cond of winningConditions) {
      const [a,b,c] = cond;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setCurrent("X");
    setStatus("Player X's turn");
    setGameActive(true);
  }

  return (
    <div className="text-center">
      <h1>Tic Tac Toe</h1>
      <h2 id="status" className="mb-4">{status}</h2>

      <div className="grid-container mx-auto" style={{ maxWidth: 320 }}>
        {board.map((cell, i) => (
          <div
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
            role="button"
            aria-label={`cell-${i}`}
          >
            {cell ? (
              (xImage && oImage) ? (
                <img src={cell === "X" ? xImage : oImage} alt={cell} />
              ) : (
                <span style={{ fontSize: "2.5rem" }}>{cell}</span>
              )
            ) : null}
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-4" onClick={resetGame}>
        {refreshImg ? <img src={refreshImg} alt="refresh" style={{ width: 20, height: 20, marginRight: 8, verticalAlign: "middle" }} /> : null}
        Reset Game
      </button>
    </div>
  );
}
