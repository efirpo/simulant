import Cell from './Cell';
import Ant from './Ant';


export let population = [];
export let coordArr = [];
export let tempCoords = [];
export const gridSize = 400;
export const maxAnts = 50;
export let antsOut = 0;

export const createPopulation = () => {
  for (let i = 0; i <= maxAnts; i++) {
    let newAnt = new Ant();
    newAnt.coords = createRandomCoords(0, 0)
    population[i] = newAnt;
  }
}
let pickDirection = () => {
  return Math.ceil(Math.random() * 8)
}
export const moveAnt = (i) => {
  let caseNum = pickDirection()
  let newCoords;
  switch (caseNum) {
    case 1:
      newCoords = [population[i].coords[0] += 3,
      population[i].coords[1] += 0]
      return newCoords

    case 2:
      newCoords = [
        population[i].coords[0] += 3,
        population[i].coords[1] += 3]
      return newCoords

    case 3:
      newCoords = [
        population[i].coords[0] += 0,
        population[i].coords[1] += 3]
      return newCoords

    case 4:
      newCoords = [
        population[i].coords[0] -= 3,
        population[i].coords[1] += 3]
      return newCoords

    case 5:
      newCoords = [
        population[i].coords[0] -= 3,
        population[i].coords[0] += 0]
      return newCoords

    case 6:
      newCoords = [
        population[i].coords[0] -= 3,
        population[i].coords[0] -= 3]
      return newCoords

    case 7:
      newCoords = [
        population[i].coords[0] += 0,
        population[i].coords[1] -= 3]
      return newCoords

    case 8:
      newCoords = [
        population[i].coords[0] += 3,
        population[i].coords[1] -= 3]
      return newCoords

    default:
      return null
  }
}

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
  let a = createRandomNum(x + 1, x + gridSize);
  let b = createRandomNum(y + 1, y + gridSize);
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

export const spawnFood = () => {
  let newCoords = createRandomCoords(0, 0);
  var a = newCoords[0]
  var b = newCoords[1];
  coordArr[a][b].food = Math.random() * 1.5

}