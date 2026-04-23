"use client";

import { useState } from "react";

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

function createBoard(size: number, mines: number) {
  const board: Cell[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })),
  );

  let placed = 0;
  while (placed < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (!board[row][col].mine) {
      board[row][col].mine = true;
      placed += 1;
    }
  }

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col].mine) {
        continue;
      }

      let adjacent = 0;
      for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
        for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
          const nextRow = row + rowOffset;
          const nextCol = col + colOffset;
          if (
            nextRow >= 0 &&
            nextRow < size &&
            nextCol >= 0 &&
            nextCol < size &&
            board[nextRow][nextCol].mine
          ) {
            adjacent += 1;
          }
        }
      }

      board[row][col].adjacent = adjacent;
    }
  }

  return board;
}

function reveal(board: Cell[][], row: number, col: number) {
  const cell = board[row][col];
  if (cell.revealed || cell.flagged) {
    return;
  }

  cell.revealed = true;
  if (cell.mine || cell.adjacent !== 0) {
    return;
  }

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;
      if (
        nextRow >= 0 &&
        nextRow < board.length &&
        nextCol >= 0 &&
        nextCol < board.length
      ) {
        reveal(board, nextRow, nextCol);
      }
    }
  }
}

export function MinesweeperApp() {
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [board, setBoard] = useState(() => createBoard(8, 10));

  const restart = () => {
    setBoard(createBoard(8, 10));
    setStatus("playing");
  };

  const revealCell = (row: number, col: number) => {
    if (status !== "playing") {
      return;
    }

    setBoard((current) => {
      const next = current.map((boardRow) => boardRow.map((cell) => ({ ...cell })));
      const cell = next[row][col];
      if (cell.flagged || cell.revealed) {
        return current;
      }

      if (cell.mine) {
        next.forEach((boardRow) =>
          boardRow.forEach((boardCell) => {
            if (boardCell.mine) {
              boardCell.revealed = true;
            }
          }),
        );
        setStatus("lost");
        return next;
      }

      reveal(next, row, col);
      const remainingSafeCells = next
        .flat()
        .filter((cellItem) => !cellItem.mine && !cellItem.revealed).length;
      if (remainingSafeCells === 0) {
        setStatus("won");
      }
      return next;
    });
  };

  const toggleFlag = (event: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => {
    event.preventDefault();
    if (status !== "playing") {
      return;
    }

    setBoard((current) =>
      current.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) =>
          rowIndex === row && colIndex === col && !cell.revealed
            ? { ...cell, flagged: !cell.flagged }
            : cell,
        ),
      ),
    );
  };

  const minesLeft = 10 - board.flat().filter((cell) => cell.flagged).length;

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#c5cdd9] p-4">
      <div className="mb-4 flex items-center justify-between rounded border border-[#7a7f87] bg-[#b4bcc8] p-3 shadow-[inset_1px_1px_0_rgba(255,255,255,0.8)]">
        <div className="font-mono text-2xl text-[#b91f31]">{String(minesLeft).padStart(3, "0")}</div>
        <button type="button" className="xp-button px-4 py-2 text-sm" onClick={restart}>
          {status === "playing" ? "New Game" : status === "won" ? "You Won!" : "Try Again"}
        </button>
        <div className="font-mono text-lg text-[#2e4d72]">{status.toUpperCase()}</div>
      </div>
      <div className="grid w-fit grid-cols-8 gap-[2px] rounded border border-[#7a7f87] bg-[#7a7f87] p-[2px]">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              type="button"
              className={`grid h-10 w-10 place-items-center text-sm font-bold ${
                cell.revealed
                  ? "bg-[#d8dde6] text-[#183b6a]"
                  : "bg-[#c8d0db] shadow-[inset_1px_1px_0_rgba(255,255,255,0.8),inset_-1px_-1px_0_rgba(0,0,0,0.25)]"
              }`}
              onClick={() => revealCell(rowIndex, colIndex)}
              onContextMenu={(event) => toggleFlag(event, rowIndex, colIndex)}
            >
              {cell.flagged
                ? "F"
                : cell.revealed && cell.mine
                ? "*"
                : cell.revealed && cell.adjacent > 0
                ? cell.adjacent
                : ""}
            </button>
          )),
        )}
      </div>
      <p className="mt-4 text-sm text-[#405a78]">
        Left click reveals a tile. Right click places a flag.
      </p>
    </div>
  );
}
