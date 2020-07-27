import Cell from './Cell';
import Ant from './Ant';

export let coordArr = [];
export let tempCoords = [];
export const gridSize = 200;
export const maxAnts = 50;
export let antsOut = 0;

export const createGrid = () => {
  for (let x = 0; x < gridSize; x++) {
    coordArr[x] = [];
    tempCoords[x] = [];
    for (let y = 0; y < gridSize; y++) {
      coordArr[x][y] = new Cell(x, y);
      tempCoords[x][y] = new Cell(x, y)
    }
  }
}

export const createRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
}

export const createRandomCoords = (x, y) => {
  let a = createRandomNum(x + 1, x + 100);
  let b = createRandomNum(y + 1, y + 100);
  let z = createBound(a);
  let q = createBound(b);
  return [z, q]
}
export const createBound = (i) => {
  let bound = i;
  if (i < 0) {
    bound = 0
  }
  if (i >= gridSize) {
    bound = gridSize
  }
  return bound

}

export const spawnAnt = () => {
  let x = 0;
  let y = 0;
  let newCoords = createRandomCoords(x, y);
  var a = newCoords[0];
  var b = newCoords[1];
  if (coordArr[a][b].hasAnt() == false && antsOut < maxAnts) {
    coordArr[a][b].ant = new Ant();
    tempCoords[a][b].ant = coordArr[a][b].ant
    antsOut += 1;
    console.log("ANTS:" + a + "," + b)
    console.table(coordArr[a][b].ant)
  }
  return [a, b]
}