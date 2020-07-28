import Cell from './Cell';
import Ant from './Ant';


export let population = [];
export let coordArr = [];
export let tempCoords = [];
export const gridSize = 400;
export const maxAnts = 100;
export let antsOut = 0;

export const createPopulation = () => {
  for (let i = 0; i <= maxAnts; i++) {
    let newAnt = new Ant();
    newAnt.coords = [gridSize / 2, gridSize / 2]
    population[i] = newAnt;
  }
}


export const moveAnt = (i) => {
  let changeDirection = Math.ceil(Math.random() * 3)
  switch (changeDirection) {
    case 1:
      if (population[i].orientation == 8) {
        population[i].orientation = 1
      } else {
        population[i].orientation += 1
      }
      break
    case 2:
      break
    case 3:
      if (population[i].orientation == 1) {
        population[i].orientation = 8
      } else {
        population[i].orientation -= 1
      }

  }
  let newCoords;
  switch (population[i].orientation) {
    case 1:
      newCoords = [
        createBound(population[i].coords[0] + (Math.ceil(Math.random() * 2))),
        population[i].coords[1]]
      return newCoords

    case 2:
      newCoords = [
        createBound(population[i].coords[0] + 1),
        createBound(population[i].coords[1] + 1)]
      return newCoords

    case 3:
      newCoords = [
        population[i].coords[0],
        createBound(population[i].coords[1] + (Math.ceil(Math.random() * 2)))]
      return newCoords

    case 4:
      newCoords = [
        createBound(population[i].coords[0] - 1),
        createBound(population[i].coords[1] + 1)]
      return newCoords

    case 5:
      newCoords = [
        createBound(population[i].coords[0] - (Math.ceil(Math.random() * 2))),
        population[i].coords[0]]
      return newCoords

    case 6:
      newCoords = [
        createBound(population[i].coords[0] - 1),
        createBound(population[i].coords[1] - 1)]
      return newCoords

    case 7:
      newCoords = [
        population[i].coords[0],
        createBound(population[i].coords[1] - (Math.ceil(Math.random() * 2)))]
      return newCoords

    case 8:
      newCoords = [
        createBound(population[i].coords[0] + 1),
        createBound(population[i].coords[1] - 1)]
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

// export const spawnFood = () => {
//   let newCoords = createRandomCoords(0, 0);
//   var a = newCoords[0]
//   var b = newCoords[1];
//   coordArr[a][b].food = Math.random() * 1.5

// }