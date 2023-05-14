import { useTheme } from "styled-components";
import { useEffect, useRef, useState } from "react";

import { CellProps, CELL_STATE } from "./types";
import {
  GridButtonsContainer,
  GridCanvas,
  GridContainer,
  GridHeader,
} from "./style";
import Button from "../Button";

const Grid: React.FC = () => {
  const theme = useTheme();

  const [intervalID, setIntervalID] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<CellProps[][]>([]);
  const [cellSize] = useState<number>(20);
  const [mouseDown, setMouseDown] = useState(false);
  const [toggledCells, setToggledCells] = useState<Set<string>>(new Set());
  const [iteration, setIteretion] = useState(0);

  const updateStates = () => {
    setIteretion((oldIteration) => oldIteration + 1);
    const clonedGrid = [...grid].map((el) => [...el]);
    const numRows = clonedGrid.length;
    const numCols = clonedGrid[0].length;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const cell = clonedGrid[i][j];
        const liveNeighbors = countLiveNeighbors(clonedGrid, i, j);

        if (cell.state === CELL_STATE.ALIVE) {
          if (liveNeighbors === 2 || liveNeighbors === 3) {
            cell.intermediateState = CELL_STATE.ALIVE;
          }
        } else {
          if (liveNeighbors === 3) {
            cell.intermediateState = CELL_STATE.ALIVE;
          }
        }
      }
    }

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const cell = clonedGrid[i][j];
        cell.state = cell.intermediateState;
        cell.intermediateState = CELL_STATE.DEAD;
      }
    }
    setGrid(clonedGrid);
  };

  const countLiveNeighbors = (
    grid: CellProps[][],
    row: number,
    col: number
  ) => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    let liveNeighbors = 0;

    const positions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of positions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        liveNeighbors +=
          grid[newRow][newCol].state === CELL_STATE.ALIVE ? 1 : 0;
      }
    }

    return liveNeighbors;
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const x = colIndex * cellSize;
          const y = rowIndex * cellSize;

          ctx.fillStyle =
            cell.state === CELL_STATE.ALIVE
              ? theme?.selectedCellColor
              : theme?.secondaryBackgroundColor;
          ctx.fillRect(x, y, cellSize, cellSize);

          ctx.strokeStyle = theme?.borderColor;
          ctx.strokeRect(x, y, cellSize, cellSize);
        });
      });
    }
  }, [grid, cellSize, theme]);

  const handleCellMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !mouseDown) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rowIndex = Math.floor(y / cellSize);
    const colIndex = Math.floor(x / cellSize);
    const cellKey = `${rowIndex},${colIndex}`;

    if (!toggledCells.has(cellKey)) {
      const updatedGrid = [...grid];
      updatedGrid[rowIndex][colIndex].state =
        updatedGrid[rowIndex][colIndex].state === CELL_STATE.ALIVE
          ? CELL_STATE.DEAD
          : CELL_STATE.ALIVE;

      setGrid(updatedGrid);
      setToggledCells((prevSet) => new Set(prevSet).add(cellKey));
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setToggledCells(new Set());
  };

  const handleCellClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rowIndex = Math.floor(y / cellSize);
    const colIndex = Math.floor(x / cellSize);

    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex].state =
      updatedGrid[rowIndex][colIndex].state === CELL_STATE.ALIVE
        ? CELL_STATE.DEAD
        : CELL_STATE.ALIVE;

    setGrid(updatedGrid);
  };

  const handleResetGrid = () => {
    if (!canvasRef.current) return;
    clearInterval(intervalID);
    setIteretion(0);
    setIntervalID(0);
    const canvas = canvasRef.current;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const emptyGrid: CellProps[][] = Array.from(
      Array(Math.floor(canvasRef.current?.height! / cellSize)),
      () =>
        Array(Math.floor(width / cellSize))
          .fill("")
          .map(() => ({
            state: CELL_STATE.DEAD,
            intermediateState: CELL_STATE.DEAD,
          }))
    );
    setGrid(emptyGrid);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const initialGrid: CellProps[][] = Array.from(
      Array(Math.floor(height / cellSize)),
      () =>
        Array(Math.floor(width / cellSize))
          .fill("")
          .map(() => ({
            state: CELL_STATE.DEAD,
            intermediateState: CELL_STATE.DEAD,
          }))
    );
    setGrid(initialGrid);
  }, [cellSize]);

  const handleClick = () => {
    if (!!intervalID) {
      clearInterval(intervalID);
      setIntervalID(0);
    } else {
      const intervalID = setInterval(updateStates, 450);
      setIntervalID(intervalID);
    }
  };

  return (
    <GridContainer>
      <GridHeader>Number of iterations: {iteration}</GridHeader>
      <GridCanvas
        ref={canvasRef}
        onClick={handleCellClick}
        onMouseUp={handleMouseUp}
        onMouseMove={handleCellMouseMove}
        onMouseDown={() => setMouseDown(true)}
      />
      <GridButtonsContainer>
        <Button onClick={handleResetGrid}>Reset</Button>
        <Button onClick={updateStates} disabled={!!intervalID}>
          next step
        </Button>
        <Button onClick={handleClick}>{!!intervalID ? "stop" : "start"}</Button>
      </GridButtonsContainer>
    </GridContainer>
  );
};

export default Grid;
