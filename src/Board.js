import React, { useState } from "react"
import Cell from "./Cell"
import "./Board.css"

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
  const [board, setBoard] = useState(createBoard())
  // const randNum = () => Math.floor(Math.random * 1)

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = []
    for(let i=0; i < nrows; i++) {
      let row = []
      for(let j=0; j < ncols; j++) {
        row.push(randNum() < chanceLightStartsOn)
      }
      initialBoard.push(row)
    }
    return initialBoard
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number)

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x]
        }
      }

      const boardCopy = oldBoard.map(row => [...row])

      flipCell(y, x, boardCopy)
      flipCell(y - 1, x, boardCopy)
      flipCell(y + 1, x, boardCopy)
      flipCell(y, x -1, boardCopy)
      flipCell(y, x + 1, boardCopy)

      return boardCopy
    })
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()) {
    return <div>Congrats, you won the game!</div>
  }
  // TODO

  // make table board
  let table = []

  for(let i = 0; i < nrows; i++) {
    let row = []
    for(let j = 0; j < ncols; j++) {
      let coordinate = `${y}-${x}`
      row.push(
        <Cell
          key={coordinate}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coordinate)}
        />
      )
    }
    table.push(<tr key={y}>{row}</tr>)
  }

  return (
    <table>
      <tbody>{table}</tbody>
    </table>
  )
}

export default Board
