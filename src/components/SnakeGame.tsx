import * as React from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';
import { start, changeDirection, createBoard } from '../game';
import { getDirectionFromKey } from '../helpers';

export interface Props {
  board: any;
  snake: any;
  start: Function;
  food: any;
  isStarted: boolean;
  changeDirection: Function;
  createBoard: Function;
  boardSize: number;
  score: number;
  isGameOver: boolean;
}

class SnakeGame extends React.Component<Props, object> {

  handleKeyPress = (e) => {
    this.props.changeDirection(getDirectionFromKey(e));
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  getCellClass = (snake, food, rowIndex, cellIndex) => {
    let cellClass = snake
      .some(item => item.y === cellIndex && item.x === rowIndex) ? 'snakeCell ' : 'cell ';
    return cellClass += this.props.food
      .some(item => item.y === cellIndex && item.x === rowIndex) && 'foodCell';
  }

  render() {
    const {
      snake,
      food,
      start,
      createBoard,
      isStarted,
      boardSize,
      isGameOver,
      score,
    } = this.props;

    return (
      <div>
        <div className="controls">
          {!isStarted &&
            <button className="startButton" onClick={() => start()}>
              Start
            </button>}
          <span>Field size: </span>
          <button className="button" onClick={() => createBoard(boardSize - 1)}>-</button>
          <span className="boardSize">{boardSize}</span>
          <button className="button" onClick={() => createBoard(boardSize + 1)}>+</button>
        </div>
        <span>score: {score} </span>
        {isGameOver
          ? <div> Game over </div>
          : <div className="board">
            {this.props.board.map((row, rowIndex) =>
              <div className="row" key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => {
                  return (
                    <div
                      className={this.getCellClass(snake, food, rowIndex, cellIndex)}
                      key={`cell-${cellIndex}`}
                    />
                  );
                })}
              </div>
            )}
          </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
  snake: state.snake,
  food: state.food,
  boardSize: state.boardSize,
  isStarted: state.isStarted,
  isGameOver: state.isGameOver,
  score: state.score,
});

const mapDispatchToProps = (dispatch) => ({
  changeDirection: (direction) => dispatch(changeDirection(direction)),
  createBoard: (size) => dispatch(createBoard(size)),
  start: () => dispatch(start()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnakeGame);
