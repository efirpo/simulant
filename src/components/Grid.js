import Food from './Food';
import Ant from './Ant';


export let population = [];
export const nestCoords = [125, 0]
export let foodCoords = [];
export let trails = [];
export const gridSize = 250;
export const maxAnts = 90;
export let antsOut = 0;
export const maxFood = 5

export const createPopulation = () => {
  for (let i = 0; i <= maxAnts; i++) {
    let newAnt = new Ant();
    newAnt.coords = nestCoords
    population[i] = newAnt;
  }
}

export const createFood = () => {
  for (let i = 0; i < maxFood; i++) {
    let newFood = new Food();
    foodCoords[i] = newFood
  }
}

export const replaceFood = (index) => {
  let newFood = new Food();
  foodCoords[index] = newFood
}


export const wanderAnt = (i) => {
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

export const wanderHome = (i) => {
  let currentCoords = [population[i].Shape.x, population[i].Shape.y]
  let targetCoords = [0, 0];
  do {
    targetCoords = wanderAnt(i)
  }
  while (Math.floor(calcDistance(targetCoords, nestCoords)) >= Math.floor(calcDistance(currentCoords, nestCoords)))
  return targetCoords
}

export const moveToHome = (i) => {
  population[i].Shape.x = population[i].trail[0][0]
  population[i].Shape.y = population[i].trail[0][1]
  let shiftCoords = population[i].trail.shift()
  population[i].trail.push(shiftCoords)

}

export const moveToFood = (i) => {
  population[i].Shape.x = population[i].trail[population[i].trail.length - 1][0]
  population[i].Shape.y = population[i].trail[population[i].trail.length - 1][1]
  let shiftCoords = population[i].trail.pop()
  population[i].trail.unshift(shiftCoords)
}

export const makeTrail = (i) => {
  population[i].trail.push([population[i].Shape.x, population[i].Shape.y])
  if (trails[i] === undefined) {
    trails[i] = [[population[i].Shape.x, population[i].Shape.y]]
  } else {
    trails[i].push([population[i].Shape.x, population[i].Shape.y])
  }
}

export const checkForTrail = (i) => {
  for (let j = 0; j < trails.length; j++) {
    if (trails[j] == undefined) {
    } else {
      let currentCoords = [population[i].Shape.x, population[i].Shape.y]
      for (let k = 0; k < trails[j].length; k++) {
        if (calcDistance(currentCoords, trails[j][k]) < 2) {
          if (population[i].trail.length < trails[j].length) {
            let tempTrail = trails[j]
            let front = tempTrail.slice(0, k)
            let back = tempTrail.slice(k)
            population[i].trail = back.concat(front)
            population[i].followingTrail = true

          }

        }
      }
    }
  }
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