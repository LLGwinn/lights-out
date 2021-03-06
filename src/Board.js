import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // TODO: create array-of-arrays of true/false values
    for (let i=0; i < nrows; i++) {
      let row = [];
      for (let j=0; j < ncols; j++) {
        row.push((Math.random() * 100) <= chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // for (let row of board) {
    //   console.log('row:', row)
    //   for (let cell of row) {
    //     console.log('cell:', cell)
    //   }
    // }
    let lights = [];

    board.forEach( row => {
      row.forEach (cell => {
        if (cell === true) lights.push(cell);
      })
    })

    return (lights.length === 0)
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map( (rowArray) => rowArray.slice());

      // TODO: in the copy, flip this cell and the cells around it
      const cellsToFlip = [[y,x], [y+1, x], [y-1, x], [y, x+1], [y, x-1]];
      cellsToFlip.forEach( (cell) => flipCell(cell[0], cell[1], newBoard));

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  // make table board
  return (
    hasWon() ?
    <div className='Board-winner'>
      YOU WIN!
    </div>
    :
    <div>
      <table>
        <tbody>
          {
          board.map( (row, yidx) => {
            return (
              <tr key={yidx}>
                {row.map( (cell, xidx) => {
                  let coords = `${yidx}-${xidx}`;
                  return <Cell key={coords} 
                               isLit={cell} 
                               coords={coords} 
                               flipCellsAroundMe={flipCellsAround}/>
                  }
                )}
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
  
  // TODO
}

export default Board;
