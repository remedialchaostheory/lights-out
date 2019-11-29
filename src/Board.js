import React, { Component } from "react";
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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: null
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let { ncols, nrows } = this.props;
    ncols = 5; // temp
    nrows = 5; // temp
    let board = [];
    // TODO: create array-of-arrays of true/false values
    function listToMatrix(list, elementsPerSubArray) {
      // prettier-ignore
      var matrix = [], i, k;
      for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
          k++;
          matrix[k] = [];
        }
        matrix[k].push(list[i]);
      }

      return matrix;
    }
    // Populate array with random booleans
    let cells = [];
    for (let i = 0; i < ncols*nrows; i++) {
      const int = Math.floor(Math.random() + 0.5);
      let randBool;
      int === 1 ? (randBool = true) : (randBool = false);
      cells.push(randBool);
    }

    board = listToMatrix(cells, 5);
    console.log("board ->", board);

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    return (
      <div>
        <table>
          
        </table>
        <p>board</p>
      </div>
    );

    // if the game is won, just show a winning msg & render nothing else
    // TODO
    // make table board
    // TODO
  }
}

export default Board;
