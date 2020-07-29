import Food from './Food';
import Ant from './Ant';


export let population = [];
export const nestCoords = [20, 0]
export let foodCoords = [];
export let trails = [];
export const gridSize = 200;
export const maxAnts = 5;
export let antsOut = 0;
export const maxFood = 3

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
        createBound(population[i].Shape.x + (Math.ceil(Math.random() * 4))),
        population[i].Shape.y
      ]

    case 2:
      return [
        createBound(population[i].Shape.x + 2),
        createBound(population[i].Shape.y + 2)
      ]

    case 3:
      return [
        population[i].Shape.x,
        createBound(population[i].Shape.y + (Math.ceil(Math.random() * 4)))
      ]

    case 4:
      return [
        createBound(population[i].Shape.x - 2),
        createBound(population[i].Shape.y + 2)
      ]

    case 5:
      return [
        createBound(population[i].Shape.x - (Math.ceil(Math.random() * 4))),
        population[i].Shape.y
      ]

    case 6:
      return [
        createBound(population[i].Shape.x - 2),
        createBound(population[i].Shape.y - 2)
      ]


    case 7:
      return [
        population[i].Shape.x,
        createBound(population[i].Shape.y - (Math.ceil(Math.random() * 4)))
      ]

    case 8:
      return [
        createBound(population[i].Shape.x + 2),
        createBound(population[i].Shape.y - 2)
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
  // }
  // return [gridSize / 2, gridSize / 2]
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
}

export const checkForTrail = (i) => {
  for (let j = 0; j < trails.length; j++) {
    if (trails[j].includes([population[i].Shape.x, population[i].Shape.y])) {
      population[i].trail = trails[j]
      population[i].followingTrail = true
    }
  }
}

// export const moveToFood = (i) => {
//   let currentCoords = [population[i].Shape.x, population[i].Shape.y]
//   let targetCoords = [0, 0];
//   do {
//     targetCoords = moveAnt(i)
//   } while (
//     Math.floor(calcDistance(targetCoords, population[i].target)) >= Math.floor(calcDistance(currentCoords, population[i].target))
//   )
//   return targetCoords
// }

// export const makeTrail = (i) => {
//   if (tempCoords[i] === undefined) {
//     tempCoords[i] = [[population[i].Shape.x, population[i].Shape.y]]
//   }
//   else if (tempCoords[i].length < 25) {
//     tempCoords[i].push([population[i].Shape.x, population[i].Shape.y])
//   } else {
//     tempCoords[i].shift()
//     tempCoords[i].push([population[i].Shape.x, population[i].Shape.y])
//   }
// }

// export const checkForTrail = (i) => {
//   for (let j = 0; j < maxAnts; j++) {
//     if (tempCoords[j] === undefined) { }
//     else if (tempCoords[j].includes([population[i].Shape.x, population[i].Shape.y])) {

//       population[i].trail = tempCoords[j]

//       //   population[i].Shape.x = population[i].trail[population[i].trail.length - 2][0]
//       //   population[i].Shape.y = population[i].trail[population[i].trail.length - 2][1]
//       // }
//       // console.log(population[i].trail)
//     }

//   }
// }


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