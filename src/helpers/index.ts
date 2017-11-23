import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  OPPOSITE_DIRECTIONS,
} from '../constants/index';

export const makeBoard = (size, value) =>
  Array(size).fill(value).map(() => Array(size).fill(value));

export const isCellInArray = (array, cell) =>
  array.some(foodCell => foodCell.x === cell.x && foodCell.y === cell.y);

export const eatFood = (food, cell) =>
  food.filter(foodCell => foodCell.x !== cell.x && foodCell.y !== cell.y);

export const moveSnake = (boardSize, snake, direction, willEat) => {
  const nextCell = getNextCell(boardSize, snake, direction);
  let newSnake = [nextCell, ...snake];
  if (!willEat) { newSnake.pop(); }
  return newSnake;
};

export const getDirectionFromKey = (e) => {
  switch (e && e.keyCode) {
    case 37:
      return DIRECTION_LEFT;
    case 38:
      return DIRECTION_UP;
    case 39:
      return DIRECTION_RIGHT;
    case 40:
      return DIRECTION_DOWN;
    default:
      return null;
  }
};

export const getRandomCell = (size: number) => ({
  x: Math.round(Math.random() * size),
  y: Math.round(Math.random() * size)
});

export const canChangeDirection = (direction, previousDirection) =>
  !(OPPOSITE_DIRECTIONS[direction] === previousDirection);

export const getNextCell = (boardSize: number, snake, direction: string) => {
  const head = snake[0];
  switch (direction) {
    case DIRECTION_LEFT:
      if ((head.y - 1) < 0) {
        return {
          x: head.x,
          y: boardSize - 1,
        };
      }
      return {
        x: head.x,
        y: head.y - 1,
      };
    case DIRECTION_RIGHT:
      if ((head.y + 1) >= boardSize) {
        return {
          x: head.x,
          y: 0,
        };
      }
      return {
        x: head.x,
        y: head.y + 1
      };
    case DIRECTION_UP:
      if ((head.x - 1) < 0) {
        return {
          x: boardSize - 1,
          y: head.y,
        };
      }
      return {
        x: head.x - 1,
        y: head.y
      };
    case DIRECTION_DOWN:
      if ((head.x + 1) >= boardSize) {
        return {
          x: 0,
          y: head.y,
        };
      }
      return {
        x: head.x + 1,
        y: head.y
      };
    default:
      return {};
  }
};