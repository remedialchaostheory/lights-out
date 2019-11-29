import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";
class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    let { ncols, nrows, hasWon } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    const clickedCell = [x, y];
    const northCell = [x, y - 1];
    const southCell = [x, y + 1];
    const eastCell = [x + 1, y];
    const westCell = [x - 1, y];
    const flipCellArr = [clickedCell, northCell, southCell, eastCell, westCell];
    for (let i = 0; i < flipCellArr.length; i++) {
      const currCell = flipCellArr[i];
      flipCell(currCell[1], currCell[0]);
    }
    console.log("board ->", board);

    hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board, hasWon });
  }

  render() {
    if (this.state.hasWon) {
      return <h1>You won!!!</h1>;
    }
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <div>
        <div className="neon-orange">Lights</div>
        <div className="neon-blue">Out</div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
