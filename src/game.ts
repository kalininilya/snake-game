import {
  DIRECTION_DOWN,
  BOARD_SIZE,
  BOARD_EMPTY,
  CREATE_BOARD,
  CHANGE_DIRECTION,
  MOVE_SNAKE,
  EAT_FOOD,
  SPAWN_FOOD,
  START_GAME,
  MAX_BOARD_SIZE,
  MIN_BOARD_SIZE,
  END_GAME,
} from './constants';

import {
  eatFood,
  moveSnake,
  makeBoard,
  getNextCell,
  getRandomCell,
  isCellInArray,
  canChangeDirection,
} from './helpers';

const initialState = {
  boardSize: BOARD_SIZE,
  board: makeBoard(20, BOARD_EMPTY),
  snake: [
    { x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }
  ],
  snakeSize: 5,
  direction: DIRECTION_DOWN,
  food: [getRandomCell(BOARD_SIZE)],
  previousDirection: '',
  isStarted: false,
  isGameOver: false,
  score: 0,
};

const reducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case START_GAME:
      return { ...initialState, isStarted: true };
    case CREATE_BOARD:
      if (action.size < MIN_BOARD_SIZE || action.size > MAX_BOARD_SIZE) {
        return state;
      }
      return {
        ...state,
        board: makeBoard(action.size, BOARD_EMPTY),
        boardSize: action.size
      };
    case CHANGE_DIRECTION:
      if (canChangeDirection(action.direction, state.previousDirection)) {
        return {
          ...state,
          direction: action.direction
        };
      }
      return state;
    case MOVE_SNAKE:
      const newSnake = moveSnake(state.boardSize, state.snake, state.direction, action.willEat);
      return {
        ...state,
        snake: newSnake,
        previousDirection: state.direction
      };
    case EAT_FOOD:
      return {
        ...state,
        food: eatFood(state.food, action.cell),
        score: state.score + 1,
      };
    case SPAWN_FOOD:
      const randomCell = getRandomCell(state.boardSize - 1);
      return {
        ...state,
        food: [randomCell]
      };

    case END_GAME:
      return {
        ...state,
        isStarted: false,
        isGameOver: true
      };
    default:
      return state;
  }
};

export const start = () => {
  return (dispatch: Function, getState) => {
    const tick = () => {
      setTimeout(() => {
        if (getState().isStarted) {
          dispatch(move()); tick();
        }
      }, 300);
    };
    if (!getState().isStarted) {
      dispatch({ type: START_GAME });
      tick();
    }
  };
};

export const move = () => (dispatch: Function, getState: Function) => {
  const { boardSize, food, snake, direction, previousDirection } = getState();
  const nextCell = getNextCell(boardSize, snake, direction);
  if (isCellInArray(snake, nextCell)) {
    dispatch({
      type: END_GAME,
    });
  }
  let willEat = false;

  if (isCellInArray(food, nextCell)) {
    willEat = true;
    dispatch({ type: EAT_FOOD, cell: nextCell });
    dispatch({ type: SPAWN_FOOD });
  }
  if (canChangeDirection(direction, previousDirection)) {
    dispatch({
      type: MOVE_SNAKE,
      willEat
    });
  }
};

export const createBoard = (size: number) => (dispatch) => {
  dispatch({
    type: CREATE_BOARD,
    size
  });
  dispatch({
    type: SPAWN_FOOD,
    size
  });
};

export const changeDirection = (direction: string) => ({
  type: CHANGE_DIRECTION,
  direction,
});

export default reducer;