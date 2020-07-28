import Food from './Food';
import Ant from './Ant';


export let population = [];
export let foodCoords = [];
export let tempCoords = [];
export const gridSize = 300;
export const maxAnts = 50;
export let antsOut = 0;
export const maxFood = 5

export const createPopulation = () => {
  for (let i = 0; i <= maxAnts; i++) {
    let newAnt = new Ant();
    // let coinFlip = Math.ceil(Math.random() * 2)
    // if (coinFlip === 1) {
    //   newAnt.carryingFood = true;
    // }
    newAnt.coords = [gridSize / 2, gridSize / 2]
    // newAnt.carryingFood = true;
    population[i] = newAnt;

  }
}

export const createFood = () => {
  for (let i = 0; i < maxFood; i++) {
    let newFood = new Food();
    foodCoords[i] = newFood
  }
}


export const moveAnt = (i) => {
  let changeDirection = Math.ceil(Math.random() * 4)
  switch (changeDirection) {
    case 1:
      if (population[i].orientation == 8) {
        population[i].orientation = 1
      } else {
        population[i].orientation += 1
      }
      break
    case 2:
    case 3:
      break
    case 4:
      if (population[i].orientation == 1) {
        population[i].orientation = 8
      } else {
        population[i].orientation -= 1
      }

  }
  switch (population[i].orientation) {
    case 1:
      // const nestCoords = [gridSize / 2, 0]
      // let currentCoords = [population[i].Shape.x, population[i].Shape.y]
      // console.log(calcDistance(currentCoords, nestCoords))
      return [
        createBound(population[i].Shape.x + (Math.ceil(Math.random() * 2))),
        population[i].Shape.y
      ]

    case 2:
      return [
        createBound(population[i].Shape.x + 1),
        createBound(population[i].Shape.y + 1)
      ]

    case 3:
      return [
        population[i].Shape.x,
        createBound(population[i].Shape.y + (Math.ceil(Math.random() * 2)))
      ]

    case 4:
      return [
        createBound(population[i].Shape.x - 1),
        createBound(population[i].Shape.y + 1)
      ]

    case 5:
      return [
        createBound(population[i].Shape.x - (Math.ceil(Math.random() * 2))),
        population[i].Shape.y
      ]

    case 6:
      return [
        createBound(population[i].Shape.x - 1),
        createBound(population[i].Shape.y - 1)
      ]


    case 7:
      return [
        population[i].Shape.x,
        createBound(population[i].Shape.y - (Math.ceil(Math.random() * 2)))
      ]

    case 8:
      return [
        createBound(population[i].Shape.x + 1),
        createBound(population[i].Shape.y - 1)
      ]

    default:
      return null
  }
}

export const moveHome = (i) => {

  const nestCoords = [gridSize / 2, 0]
  let currentCoords = [population[i].Shape.x, population[i].Shape.y]
  let targetCoords = [0, 0];
  // console.log()
  // console.log("IN MOVE HOME: " + calcDistance(currentCoords, nestCoords))
  // console.log("---------")
  for (let i = 0; i < maxAnts; i++) {
    if (tempCoords[i] === undefined) {
      tempCoords[i] = [{ coords: [population[i].Shape.x, population[i].Shape.y] }]
    }
    else if (tempCoords[i].length < 10) {
      tempCoords[i].push({ coords: [population[i].Shape.x, population[i].Shape.y] })
    } else {
      tempCoords[i].shift()
      tempCoords[i].push({ coords: [population[i].Shape.x, population[i].Shape.y] })
    }

  }
  do {
    targetCoords = moveAnt(i)
  }
  while (calcDistance(targetCoords, nestCoords) > calcDistance(currentCoords, nestCoords) && currentCoords !== [gridSize / 2, 0])
  return targetCoords
  // }
  // return [gridSize / 2, gridSize / 2]
}

export const createBound = (i) => {
  if (i <= 0) {
    i = 0
  }
  if (i >= gridSize) {
    i = gridSize
  }
  return i

}

export const calcDistance = ([x, y], [a, b]) => {
  return Math.pow(Math.pow(Math.abs(x - a), 2) + Math.pow(Math.abs(y - b), 2), 0.5);
}

// export const spawnFood = () => {
//   let newCoords = createRandomCoords(0, 0);
//   var a = newCoords[0]
//   var b = newCoords[1];
//   coordArr[a][b].food = Math.random() * 1.5

// }